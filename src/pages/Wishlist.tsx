import { motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/shipping";

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <Layout>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Saved Items
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Wishlist.</span>
              <br />
              <span className="text-background/50">Saved For Later.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 mt-6">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6">
          {items.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-lg overflow-hidden shadow-elegant group"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.productId)}
                        aria-label="Remove from wishlist"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-semibold mt-1 mb-2">{item.name}</h3>
                      <p className="font-medium mb-4">
                        {item.unitPrice ? formatPrice(item.unitPrice) : "Contact for quote"}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-foreground text-background hover:bg-foreground/90"
                          onClick={() => {
                            addToCart({
                              productId: item.productId,
                              slug: item.slug,
                              name: item.name,
                              category: item.category,
                              image: item.image,
                              unitPrice: item.unitPrice ?? 0,
                            });
                            toast({ title: "Added to cart", description: item.name });
                          }}
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        {item.slug && (
                          <Button asChild variant="outline">
                            <Link to={`/shop/${item.slug}`}>View</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button variant="ghost" onClick={clearWishlist}>
                  Clear wishlist
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-8">
                Tap the heart on any product to save it here.
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
