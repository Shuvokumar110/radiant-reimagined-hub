import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Lock, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SHIPPING_OPTIONS, ShippingMethod, shippingCost, formatPrice } from "@/lib/shipping";

export default function Checkout() {
  const { items, totalItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  useEffect(() => {
    if (user?.email) {
      setForm((f) => (f.email ? f : { ...f, email: user.email as string }));
    }
  }, [user]);

  const shipping = shippingCost(shippingMethod, subtotal);
  const total = subtotal + shipping;

  const update = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("place-order", {
        body: {
          shippingMethod,
          customer: form,
          items: items.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            category: i.category,
            image: i.image,
            size: i.size,
            quantity: i.quantity,
          })),
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      clearCart();
      navigate(`/order-confirmation?orderId=${data.orderId}&email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      console.error(err);
      toast({
        title: "We couldn't place your order",
        description: "Please check your details and try again, or contact us for help.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <section className="pt-40 pb-24 bg-background min-h-[70vh]">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add products to your cart before checking out.
            </p>
            <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-12 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <Lock className="h-3 w-3" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Secure Checkout
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-background">Checkout.</span>{" "}
              <span className="text-background/50">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            </h1>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-10">
              {/* Contact */}
              <div>
                <h2 className="text-xl font-semibold mb-6">Contact details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="organization">Club / organization</Label>
                    <Input
                      id="organization"
                      value={form.organization}
                      onChange={(e) => update("organization", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping address */}
              <div>
                <h2 className="text-xl font-semibold mb-6">Shipping address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="address1">Address *</Label>
                    <Input
                      id="address1"
                      required
                      value={form.address1}
                      onChange={(e) => update("address1", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="address2">Apartment, suite (optional)</Label>
                    <Input
                      id="address2"
                      value={form.address2}
                      onChange={(e) => update("address2", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State / region</Label>
                    <Input
                      id="state"
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal code *</Label>
                    <Input
                      id="postalCode"
                      required
                      value={form.postalCode}
                      onChange={(e) => update("postalCode", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      required
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping method */}
              <div>
                <h2 className="text-xl font-semibold mb-6">Delivery</h2>
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        shippingMethod === option.id
                          ? "border-foreground"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          className="accent-foreground"
                          checked={shippingMethod === option.id}
                          onChange={() => setShippingMethod(option.id)}
                        />
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <span className="font-medium">
                        {shippingCost(option.id, subtotal) === 0
                          ? "Free"
                          : formatPrice(shippingCost(option.id, subtotal))}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Order notes</Label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Sizes breakdown, names and numbers, deadlines..."
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 sm:p-8 bg-muted rounded-lg sticky top-32"
              >
                <h2 className="text-xl font-semibold mb-6">Order summary</h2>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1 mb-6">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-3">
                      <div className="w-14 h-14 rounded-md overflow-hidden bg-background flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size ? `${item.size} · ` : ""}Qty {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-3">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full mt-6 bg-foreground text-background hover:bg-foreground/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Placing order...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  We'll confirm your order by email and send a payment link before production
                  starts.
                </p>
              </motion.div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
