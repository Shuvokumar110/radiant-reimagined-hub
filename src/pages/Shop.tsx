import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Filter, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";

const categories = ["All", "Soccer Boots", "Training Wear", "Match Day Kits", "Accessories"];

const products = [
  {
    id: 1,
    name: "Elite Pro Jersey",
    category: "Training Wear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=800",
    tags: ["Pro-Grade", "Moisture Wicking"],
  },
  {
    id: 2,
    name: "Championship Shorts",
    category: "Match Day Kits",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800",
    tags: ["Lightweight", "Breathable"],
  },
  {
    id: 3,
    name: "Kangaroo Leather Boots",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800",
    tags: ["Made in Italy", "Kangaroo Leather"],
  },
  {
    id: 4,
    name: "Team Training Kit",
    category: "Training Wear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800",
    tags: ["Complete Set"],
  },
  {
    id: 5,
    name: "Pro Match Socks",
    category: "Accessories",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=800",
    tags: ["Cushioned", "Anti-Slip"],
  },
  {
    id: 6,
    name: "Goalkeeper Gloves",
    category: "Accessories",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800",
    tags: ["Grip Technology"],
  },
  {
    id: 7,
    name: "Track Jacket",
    category: "Training Wear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882b68?q=80&w=800",
    tags: ["Windproof", "Lightweight"],
  },
  {
    id: 8,
    name: "Classic Boot Collection",
    category: "Soccer Boots",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1560769680-ba2f3767c785?q=80&w=800",
    tags: ["Premium Leather"],
  },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <h1 className="text-display text-center mb-6">Shop</h1>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-center text-background/70 max-w-2xl mx-auto">
              Discover our premium collection of athletic apparel and footwear.
              All products are available for custom team orders.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-background border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-luxury transition-shadow duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWishlist(product.id)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                          wishlist.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white text-foreground"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg"
                      >
                        <ShoppingBag className="h-5 w-5" />
                      </motion.button>
                    </motion.div>

                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-foreground text-background text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold mt-1 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.price}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-headline mb-4">Need Custom Orders?</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for bulk team orders, custom designs, and special pricing.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <a href="/contact">Request a Quote</a>
            </Button>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
