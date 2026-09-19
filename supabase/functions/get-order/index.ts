import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { orderId, orderNumber, email } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    let query = supabase.from("shop_orders").select("*").limit(1);
    if (orderId) query = query.eq("id", orderId);
    else if (orderNumber) query = query.eq("order_number", orderNumber);
    else {
      return new Response(JSON.stringify({ error: "Missing order reference." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: orders, error } = await query;
    if (error) throw error;
    const order = orders?.[0];

    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found." }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Guests must prove ownership with the email on the order.
    let authorized = false;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      const { data } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
      if (data.user && (data.user.id === order.user_id || data.user.email === order.email)) {
        authorized = true;
      }
    }
    if (!authorized && email && String(email).toLowerCase() === String(order.email).toLowerCase()) {
      authorized = true;
    }

    if (!authorized) {
      return new Response(JSON.stringify({ error: "Not authorized to view this order." }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: items } = await supabase
      .from("shop_order_items")
      .select("*")
      .eq("order_id", order.id);

    return new Response(JSON.stringify({ order, items: items || [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("get-order failed", error);
    return new Response(JSON.stringify({ error: "Could not load the order." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
