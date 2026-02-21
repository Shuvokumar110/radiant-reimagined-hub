import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { CatalogDownloadBanner } from "@/components/shop/CatalogDownloadButton";
import { ArrowLeft, X } from "lucide-react";
import { shopProductsByCategory } from "@/data/shopProducts";

// Category Images
import soccerImg from "@/assets/categories/soccer.png";
import basketballImg from "@/assets/categories/basketball.png";
import americanFootballImg from "@/assets/categories/american-football.png";
import cricketImg from "@/assets/categories/cricket.png";
import volleyballImg from "@/assets/categories/volleyball.png";
import netballImg from "@/assets/categories/netball.png";
import tracksuitImg from "@/assets/categories/tracksuits.png";
import hoodiesImg from "@/assets/categories/hoodies.png";
import poloImg from "@/assets/categories/polo-jerseys.png";
import sportsJerseyImg from "@/assets/categories/sports-jersey.png";

// Boot images
import style672 from "@/assets/products/style-672-4.png";
import style972 from "@/assets/products/style-972-1.png";
import giveAKick from "@/assets/products/give-a-kick-to-racism-1.png";

const categories = [
  { id: "soccer", name: "Soccer", image: soccerImg },
  { id: "basketball", name: "Basketball", image: basketballImg },
  { id: "american-football", name: "American Football", image: americanFootballImg },
  { id: "baseball-softball", name: "Baseball/Softball", image: soccerImg },
  { id: "volleyball", name: "Volleyball", image: volleyballImg },
  { id: "netball", name: "Netball", image: netballImg },
  { id: "cricket", name: "Cricket", image: cricketImg },
  { id: "tracksuits", name: "Tracksuits", image: tracksuitImg },
  { id: "hoodies", name: "Hoodies", image: hoodiesImg },
  { id: "polo-jerseys", name: "Polo Jerseys", image: poloImg },
  { id: "sports-jersey", name: "Sports Jersey", image: sportsJerseyImg },
];

const bootProducts = [
  { id: "boot-672", name: "Soccer Boots – Style 672", image: style672, price: "From $166", slug: "style-672", tag: "Made in Italy" },
  { id: "boot-972", name: "Soccer Boots – Style 972", image: style972, price: "From $146", slug: "style-972", tag: "Made in Italy" },
  { id: "boot-gaktr", name: "Give A Kick To Racism", image: giveAKick, price: "From $184", slug: "give-a-kick-to-racism", tag: "Special Edition" },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (id: string) => {
    if (activeCategory === id) {
      setActiveCategory(null);
      return;
    }
    setActiveCategory(id);
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const activeCat = categories.find((c) => c.id === activeCategory);
  const activeProducts = activeCategory ? shopProductsByCategory[activeCategory] || [] : [];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-12 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/10 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-background/70">
                Premium Collection
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3">
              <span className="text-background">Shop.</span>
              <br />
              <span className="text-background/50">Gear Up.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 max-w-2xl text-sm md:text-lg">
              High-performance gear tailored for clubs, academies, leagues, and organizations.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Catalog Download */}
      <CatalogDownloadBanner />

      {/* Categories */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              <span className="text-foreground">Browse</span>{" "}
              <span className="text-muted-foreground">Categories</span>
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <StaggerItem key={cat.id}>
                  <button onClick={() => handleCategoryClick(cat.id)} className="w-full text-left">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        isActive
                          ? "border-foreground shadow-lg ring-2 ring-foreground/20"
                          : "border-border hover:border-foreground/30 shadow-sm hover:shadow-md"
                      }`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        {isActive && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                            <X className="w-3 h-3 text-background" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                          <h3 className="font-bold text-[11px] md:text-sm text-white leading-tight">
                            {cat.name}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Category Products */}
      <AnimatePresence>
        {activeCategory && activeCat && (
          <motion.section
            ref={productsRef}
            id="shop-products"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-muted/40 overflow-hidden scroll-mt-20"
          >
            <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-2xl font-bold">
                  <span className="text-foreground">{activeCat.name}</span>{" "}
                  <span className="text-muted-foreground">Products</span>
                </h2>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              </div>

              {activeProducts.length > 0 ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
                >
                  {activeProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="relative aspect-square overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-3 md:p-4 hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {product.tag && (
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 bg-foreground text-background text-[10px] md:text-xs font-medium rounded">
                              {product.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 md:p-4">
                        <h4 className="font-semibold text-xs md:text-sm leading-tight">
                          {product.name}
                        </h4>
                        <p className="text-xs md:text-sm font-bold text-primary mt-1.5">
                          {product.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-muted-foreground text-sm">
                    Products coming soon. Contact us for custom orders.
                  </p>
                </div>
              )}

              {/* Quote CTA */}
              <div className="mt-6 bg-foreground rounded-xl p-4 md:p-5 text-center">
                <p className="text-background text-sm font-medium mb-2">
                  Need custom {activeCat.name} gear for your team?
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-2 bg-background text-foreground font-semibold rounded-lg hover:bg-background/90 transition-colors text-sm"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Boots */}
      <section className="py-8 md:py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              <span className="text-foreground">Premium</span>{" "}
              <span className="text-muted-foreground">Soccer Boots</span>
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm mb-6">Made in Italy with premium leather</p>
          </FadeInUp>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {bootProducts.map((product) => (
              <Link key={product.id} to={`/shop/${product.slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 md:p-4 hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-foreground text-background text-[10px] md:text-xs font-medium rounded">
                        {product.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-xs md:text-sm font-bold text-primary mt-1.5">{product.price}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              <span className="text-foreground">Need Custom.</span>
              <br />
              <span className="text-muted-foreground">Team Orders?</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-sm md:text-base">
              Contact us for bulk team orders, custom designs, and special pricing.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors text-sm md:text-base"
            >
              Request a Quote
            </Link>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
