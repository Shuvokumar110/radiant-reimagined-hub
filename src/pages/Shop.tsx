import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Eye, Menu, ChevronDown, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Get categories that have products
  const availableCategories = categories.filter(cat => 
    cat === "All" || products.some(p => p.category === cat)
  );

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

      {/* Main Content */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28 bg-card rounded-xl p-6 shadow-elegant">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  Browse Categories
                </h3>
                <nav className="space-y-1">
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-foreground text-background"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Mobile Category Dropdown */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between bg-card rounded-xl px-4 py-3 shadow-elegant"
              >
                <div className="flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  <span className="font-bold">Browse Categories</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-card rounded-xl mt-2 p-4 shadow-elegant">
                      <nav className="grid grid-cols-2 gap-2">
                        {availableCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setActiveCategory(category);
                              setIsCategoryOpen(false);
                            }}
                            className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              activeCategory === category
                                ? "bg-foreground text-background"
                                : "text-foreground hover:bg-muted"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                  {activeCategory !== "All" && ` in ${activeCategory}`}
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <StaggerItem key={product.id}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        className="group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500"
                      >
                        <Link to={`/shop/${product.slug}`} className="block">
                          {/* Image */}
                          <div className="relative aspect-square overflow-hidden">
                            <motion.img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            />

                            {/* Quick Actions Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                              <motion.button
                                initial={{ scale: 0, y: 20 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  toggleWishlist(product.id);
                                }}
                                className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                                  wishlist.includes(product.id)
                                    ? "bg-red-500 text-white"
                                    : "bg-white text-foreground"
                                }`}
                              >
                                <Heart className={`h-5 w-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                              </motion.button>
                              <motion.div
                                initial={{ scale: 0, y: 20 }}
                                className="w-11 h-11 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg"
                              >
                                <Eye className="h-5 w-5" />
                              </motion.div>
                            </div>

                            {/* Tags */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                              {product.tags.slice(0, 2).map((tag) => (
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
                          <div className="p-5">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                              {product.category}
                            </span>
                            <h3 className="font-semibold text-base mt-1 mb-2 line-clamp-2">
                              {product.name}
                            </h3>
                            <p className="text-sm font-medium text-foreground">{product.price}</p>
                            
                            {/* Sizes Preview */}
                            {product.outsoles && (
                              <div className="mt-3 flex flex-wrap gap-1">
                                {product.outsoles.map((outsole) => (
                                  <span
                                    key={outsole}
                                    className="px-2 py-0.5 bg-muted text-xs font-medium rounded"
                                  >
                                    {outsole}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">No products found in this category.</p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveCategory("All")}
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Custom Orders
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Need Custom.</span>
              <br />
              <span className="text-muted-foreground">Team Orders?</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for bulk team orders, custom designs, and special pricing.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <Button
              asChild
              size="lg"
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
