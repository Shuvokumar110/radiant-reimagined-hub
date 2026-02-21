import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { ShopCategoryGrid } from "@/components/shop/ShopCategoryGrid";
import { ShopProductGrid } from "@/components/shop/ShopProductGrid";
import { CatalogDownloadBanner } from "@/components/shop/CatalogDownloadButton";
import { ArrowLeft } from "lucide-react";

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

// Boot product images
import style672 from "@/assets/products/style-672-4.png";
import style972 from "@/assets/products/style-972-1.png";
import giveAKick from "@/assets/products/give-a-kick-to-racism-1.png";

// Import team builder data for category products
import { productsBySport, type SportType } from "@/data/teamBuilderData";

const categories = [
  { id: "soccer", name: "Soccer", image: soccerImg, sportKey: "soccer" as SportType },
  { id: "basketball", name: "Basketball", image: basketballImg, sportKey: "basketball" as SportType },
  { id: "american-football", name: "American Football", image: americanFootballImg, sportKey: "american_football" as SportType },
  { id: "baseball-softball", name: "Baseball/Softball", image: soccerImg, sportKey: "baseball_softball" as SportType },
  { id: "volleyball", name: "Volleyball", image: volleyballImg, sportKey: "volleyball" as SportType },
  { id: "netball", name: "Netball", image: netballImg, sportKey: "netball" as SportType },
  { id: "cricket", name: "Cricket", image: cricketImg, sportKey: "cricket" as SportType },
  { id: "tracksuits", name: "Tracksuits", image: tracksuitImg },
  { id: "hoodies", name: "Hoodies", image: hoodiesImg },
  { id: "polo-jerseys", name: "Polo Jerseys", image: poloImg },
  { id: "sports-jersey", name: "Sports Jersey", image: sportsJerseyImg },
];

const bootProducts = [
  { id: "boot-672", name: "Soccer Boots – Style 672", image: style672, shortDescription: "Made in Italy, Kangaroo Leather", basePrice: 166, slug: "style-672" },
  { id: "boot-972", name: "Soccer Boots – Style 972", image: style972, shortDescription: "Made in Italy, Calf Leather", basePrice: 146, slug: "style-972" },
  { id: "boot-gaktr", name: "Give A Kick To Racism", image: giveAKick, shortDescription: "Special Edition, Kangaroo Leather", basePrice: 184, slug: "give-a-kick-to-racism" },
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(activeCategory === id ? null : id);
    // Scroll to products section
    setTimeout(() => {
      document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const activeCat = categories.find((c) => c.id === activeCategory);
  const activeProducts = activeCat?.sportKey
    ? productsBySport[activeCat.sportKey]?.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        shortDescription: p.shortDescription,
        basePrice: p.basePrice,
        category: p.category,
      })) || []
    : [];

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

      {/* Catalog Download Banner */}
      <CatalogDownloadBanner />

      {/* Categories Grid */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold">
                <span className="text-foreground">Browse</span>{" "}
                <span className="text-muted-foreground">Categories</span>
              </h2>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  All Categories
                </button>
              )}
            </div>
          </FadeInUp>

          <ShopCategoryGrid
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </section>

      {/* Category Products */}
      {activeCategory && (
        <section id="shop-products" className="py-8 md:py-12 bg-muted/30 scroll-mt-20">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeInUp>
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                <span className="text-foreground">{activeCat?.name}</span>{" "}
                <span className="text-muted-foreground">Products</span>
              </h2>
            </FadeInUp>

            <ShopProductGrid
              products={activeProducts}
              categoryName={activeCat?.name || ""}
            />
          </div>
        </section>
      )}

      {/* Boots Section */}
      <section className="py-8 md:py-12 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-xl md:text-2xl font-bold mb-1">
              <span className="text-foreground">Premium</span>{" "}
              <span className="text-muted-foreground">Soccer Boots</span>
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm mb-6">
              Made in Italy with premium leather
            </p>
          </FadeInUp>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {bootProducts.map((product) => (
              <Link key={product.id} to={`/shop/${product.slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 bg-foreground text-background text-[10px] md:text-xs font-medium rounded">
                        Made in Italy
                      </span>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                      {product.shortDescription}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-primary mt-2">
                      From ${product.basePrice}
                    </p>
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
