import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, X, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SHIPPING_OPTIONS, FREE_SHIPPING_THRESHOLD, formatPrice } from "@/lib/shipping";

export default function Cart() {
  const { items: cart, updateQuantity, removeFromCart, totalItems, subtotal } = useCart();
  const { toggleWishlist } = useWishlist();

  const estimatedShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_OPTIONS[0].price;

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Your Selection
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Cart.</span>
              <br />
              <span className="text-background/50">Your Items.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 mt-6">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6">
          {cart.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-card rounded-lg shadow-elegant"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {item.category}
                          </span>
                          <h3 className="font-semibold text-base sm:text-lg mt-1 truncate">
                            {item.name}
                          </h3>
                          {item.size && (
                            <p className="text-sm text-muted-foreground mt-1">{item.size}</p>
                          )}
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(item.unitPrice)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          aria-label="Remove item"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <input
                            value={item.quantity}
                            onChange={(e) => {
                              const next = parseInt(e.target.value.replace(/\D/g, ""), 10);
                              updateQuantity(item.key, Number.isNaN(next) ? 1 : next);
                            }}
                            className="w-12 text-center bg-transparent font-medium focus:outline-none"
                            aria-label="Quantity"
                          />
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-semibold">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                        <button
                          onClick={() => {
                            toggleWishlist({
                              productId: item.productId,
                              slug: item.slug,
                              name: item.name,
                              category: item.category,
                              image: item.image,
                              unitPrice: item.unitPrice,
                            });
                            removeFromCart(item.key);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Heart className="h-3.5 w-3.5" />
                          Save for later
                        </button>
                      </div>

                      {item.moq && item.quantity < item.moq && (
                        <p className="text-xs text-destructive mt-3">
                          Minimum order for this item is {item.moq} units.
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 sm:p-8 bg-muted rounded-lg sticky top-32"
                >
                  <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items</span>
                      <span>{totalItems}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated shipping</span>
                      <span>{estimatedShipping === 0 ? "Free" : formatPrice(estimatedShipping)}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(subtotal + estimatedShipping)}</span>
                    </div>
                  </div>

                  {subtotal < FREE_SHIPPING_THRESHOLD && (
                    <p className="text-xs text-muted-foreground mb-6">
                      Spend {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free standard
                      shipping.
                    </p>
                  )}

                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="w-full mt-2">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Browse the collection and add products to get started.
              </p>
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90">
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
