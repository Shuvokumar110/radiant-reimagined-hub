import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, Package } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/localBackend";
import { formatPrice } from "@/lib/shipping";

interface OrderItem {
  id: string;
  name: string;
  size: string | null;
  image: string | null;
  quantity: number;
  unit_price: number;
  line_total: number;
}

interface OrderRecord {
  id: string;
  order_number: string;
  email: string;
  first_name: string;
  last_name: string;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  shipping_method: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
}

export default function OrderConfirmation() {
  const params = useParams();
  const [search] = useSearchParams();
  const orderId = params.id ?? search.get("orderId");
  const email = search.get("email");

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!orderId) {
        setError("We couldn't find that order.");
        setLoading(false);
        return;
      }
      const { data, error: fnError } = await supabase.functions.invoke("get-order", {
        body: { orderId, email },
      });
      if (!active) return;
      if (fnError || data?.error) {
        setError("We couldn't load this order. Please check the link or contact us.");
      } else {
        setOrder(data.order);
        setItems(data.items ?? []);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [orderId, email]);

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-12 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <Package className="h-3 w-3" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Order Details
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-background">Thank you.</span>{" "}
              <span className="text-background/50">Order received.</span>
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin mr-3" />
              Loading your order...
            </div>
          ) : error || !order ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Order not available</h2>
              <p className="text-muted-foreground mb-8">{error}</p>
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-muted rounded-lg">
                <CheckCircle2 className="h-6 w-6 mt-0.5" />
                <div>
                  <p className="font-semibold">Order {order.order_number}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Placed on {new Date(order.created_at).toLocaleDateString()} · Payment{" "}
                    {order.payment_status} · Status {order.fulfillment_status}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Keep this page for your records. Our team will contact {order.email} with your
                    payment link and production timeline.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-elegant divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-5">
                    {item.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size ? `${item.size} · ` : ""}Qty {item.quantity} ·{" "}
                        {formatPrice(Number(item.unit_price))} each
                      </p>
                    </div>
                    <span className="font-medium">{formatPrice(Number(item.line_total))}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-muted rounded-lg space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(Number(order.subtotal))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Shipping ({order.shipping_method})
                  </span>
                  <span>
                    {Number(order.shipping_cost) === 0
                      ? "Free"
                      : formatPrice(Number(order.shipping_cost))}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                  <span>Total</span>
                  <span>{formatPrice(Number(order.total))}</span>
                </div>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-elegant">
                <h3 className="font-semibold mb-3">Shipping to</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {order.first_name} {order.last_name}
                  <br />
                  {order.address_line1}
                  {order.address_line2 ? <>, {order.address_line2}</> : null}
                  <br />
                  {[order.city, order.state, order.postal_code].filter(Boolean).join(", ")}
                  <br />
                  {order.country}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/account">View My Orders</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
