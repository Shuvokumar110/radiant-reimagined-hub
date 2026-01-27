import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

const initialWishlist = [
  {
    id: 1,
    name: "Elite Pro Jersey",
    category: "Training Wear",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=800",
  },
  {
    id: 3,
    name: "Kangaroo Leather Boots",
    category: "Soccer Boots",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800",
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h1 className="text-display text-center mb-4">Wishlist</h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-center text-background/70">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </FadeInUp>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6">
          {wishlist.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishlist.map((item) => (
                <StaggerItem key={item.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-luxury transition-shadow duration-500"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-lg font-semibold mt-1 mb-4">
                        {item.name}
                      </h3>
                      <Button
                        size="sm"
                        className="w-full bg-foreground text-background hover:bg-foreground/90"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-serif font-semibold mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save items you love by clicking the heart icon.
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
