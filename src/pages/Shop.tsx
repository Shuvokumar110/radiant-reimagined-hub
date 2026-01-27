import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Filter, Eye } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const categories = ["All", "Soccer Boots", "Special Edition"];

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
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Premium Collection
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Shop.</span>
              <br />
              <span className="text-background/50">Gear Up.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 max-w-xl mt-6">
              Discover our premium collection of athletic apparel and footwear.
              All products are available for custom team orders.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-background border-b border-border py-3 md:py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
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
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors ${
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
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-card rounded-lg overflow-hidden shadow-elegant hover:shadow-luxury transition-shadow duration-500"
                >
                  {/* Image */}
                  <Link to={`/shop/${product.slug}`}>
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
                        onClick={(e) => e.preventDefault()}
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product.id);
                          }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                            wishlist.includes(product.id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-foreground"
                          }`}
                        >
                          <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                        </motion.button>
                        <Link
                          to={`/shop/${product.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="w-12 h-12 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
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
                  </Link>

                  {/* Content */}
                  <Link to={`/shop/${product.slug}`} className="block p-6">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-semibold mt-1 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.price}</p>
                  </Link>
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
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 text-center">
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
