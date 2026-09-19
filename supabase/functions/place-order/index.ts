import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
import priceCatalog from "../_shared/price-catalog.json" with { type: "json" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type CatalogEntry = { price: number; moq: number };
const catalog = priceCatalog as Record<string, CatalogEntry>;

const SHIPPING_RATES: Record<string, number> = { standard: 25, express: 60 };
const FREE_SHIPPING_THRESHOLD = 1000;

interface IncomingItem {
  productId: number;
  slug?: string;
  name: string;
  category?: string;
  image?: string;
  size?: string;
  quantity: number;
}

function orderNumber() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TIDI-${stamp}-${rand}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const items: IncomingItem[] = Array.isArray(body.items) ? body.items : [];
    const customer = body.customer ?? {};
    const shippingMethod = SHIPPING_RATES[body.shippingMethod] ? body.shippingMethod : "standard";

    if (items.length === 0) {
      return new Response(JSON.stringify({ error: "Your cart is empty." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const field of ["firstName", "lastName", "email"]) {
      if (!customer[field] || String(customer[field]).trim() === "") {
        return new Response(JSON.stringify({ error: `Missing ${field}.` }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    // optional signed-in user
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const { data } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
      userId = data.user?.id ?? null;
    }

    // Prices come from the server catalog only — never from the client.
    const priced = items.map((item) => {
      const entry = catalog[String(item.productId)];
      const unitPrice = entry ? entry.price : 0;
      const quantity = Math.min(Math.max(Math.floor(Number(item.quantity) || 1), 1), 10000);
      return {
        product_id: item.productId,
        slug: item.slug ?? null,
        name: String(item.name).slice(0, 200),
        category: item.category ?? null,
        image: item.image ?? null,
        size: item.size ?? null,
        unit_price: unitPrice,
        quantity,
        line_total: Number((unitPrice * quantity).toFixed(2)),
      };
    });

    const unknown = priced.filter((p) => p.unit_price === 0);
    if (unknown.length === priced.length) {
      return new Response(
        JSON.stringify({ error: "We couldn't price these items. Please contact us for a quote." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subtotal = Number(priced.reduce((sum, p) => sum + p.line_total, 0).toFixed(2));
    const shippingCost =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATES[shippingMethod];
    const total = Number((subtotal + shippingCost).toFixed(2));

    const { data: order, error: orderError } = await supabase
      .from("shop_orders")
      .insert({
        user_id: userId,
        order_number: orderNumber(),
        email: String(customer.email).trim(),
        first_name: String(customer.firstName).trim(),
        last_name: String(customer.lastName).trim(),
        phone: customer.phone ?? null,
        organization: customer.organization ?? null,
        address_line1: customer.address1 ?? null,
        address_line2: customer.address2 ?? null,
        city: customer.city ?? null,
        state: customer.state ?? null,
        postal_code: customer.postalCode ?? null,
        country: customer.country ?? null,
        notes: customer.notes ?? null,
        shipping_method: shippingMethod,
        subtotal,
        shipping_cost: shippingCost,
        total,
        payment_status: "pending",
        fulfillment_status: "new",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const { error: itemsError } = await supabase
      .from("shop_order_items")
      .insert(priced.map((p) => ({ ...p, order_id: order.id })));

    if (itemsError) throw itemsError;

    if (userId) {
      await supabase.from("cart_items").delete().eq("user_id", userId);
    }

    return new Response(
      JSON.stringify({
        orderId: order.id,
        orderNumber: order.order_number,
        subtotal,
        shippingCost,
        total,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("place-order failed", error);
    return new Response(JSON.stringify({ error: "Could not place the order." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
