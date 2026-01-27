import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface CartItem {
  id: number;
  name: string;
  category: string;
  image: string;
  quantity: number;
}

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Elite Pro Jersey",
    category: "Training Wear",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=800",
    quantity: 2,
  },
  {
    id: 3,
    name: "Kangaroo Leather Boots",
    category: "Soccer Boots",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800",
    quantity: 1,
  },
];

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h1 className="text-display text-center mb-4">Shopping Cart</h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-center text-background/70">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6">
          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-6 bg-card rounded-lg shadow-elegant"
                  >
                    <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="font-serif text-lg font-semibold mt-1">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Contact for Pricing
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 bg-muted rounded-lg sticky top-32"
                >
                  <h2 className="font-serif text-2xl font-semibold mb-6">
                    Order Summary
                  </h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Items</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pricing</span>
                      <span>Contact for Quote</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-6 mb-8">
                    <p className="text-sm text-muted-foreground mb-4">
                      All products require a custom quote based on quantity,
                      customization, and shipping requirements.
                    </p>
                  </div>
                  <MagneticButton className="w-full bg-foreground text-background py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors">
                    <Link to="/contact">Request Quote</Link>
                  </MagneticButton>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Add products to your cart to request a quote.
              </p>
              <Button
                asChild
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
