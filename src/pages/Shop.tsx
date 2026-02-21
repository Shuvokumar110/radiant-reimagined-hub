import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { CatalogDownloadBanner } from "@/components/shop/CatalogDownloadButton";
import { Search, SlidersHorizontal, Grid3X3, LayoutGrid, X, ArrowRight } from "lucide-react";
import { products, categories as productCategories } from "@/data/products";

// Category images for filter chips
import soccerImg from "@/assets/categories/soccer.png";
import basketballImg from "@/assets/categories/basketball.png";
import americanFootballImg from "@/assets/categories/american-football.png";
import cricketImg from "@/assets/categories/cricket.png";
import tracksuitImg from "@/assets/categories/tracksuits.png";
import hoodiesImg from "@/assets/categories/hoodies.png";

const CATALOG_LINK = "https://drive.google.com/file/d/1V4FtVVC8s1QgytQwGWUlc42flUWOhUM-/view?usp=drivesdk";

// Sort options
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [gridSize, setGridSize] = useState<"compact" | "comfortable">("comfortable");
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => {
          const aNum = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
          const bNum = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
          return aNum - bNum;
        });
        break;
      case "price-desc":
        result.sort((a, b) => {
          const aNum = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
          const bNum = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
          return bNum - aNum;
        });
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-10 bg-foreground text-background">
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

      {/* Toolbar: Search, Filter, Sort, Grid Toggle */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Filter Toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium border rounded-lg transition-colors ${
                showFilters ? "bg-foreground text-background border-foreground" : "bg-background border-border"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="hidden md:block text-sm bg-muted border border-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setGridSize("comfortable")}
                className={`p-2 transition-colors ${gridSize === "comfortable" ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridSize("compact")}
                className={`p-2 transition-colors ${gridSize === "compact" ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:text-foreground"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Sort (inside filter panel) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pt-3 pb-1">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full text-sm bg-muted border border-border rounded-lg px-3 py-2"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`shrink-0 px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground"
                    : "bg-background text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-12 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs md:text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && <span className="font-medium text-foreground"> in {activeCategory}</span>}
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => handleCategoryChange("All")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear filter
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              layout
              className={`grid gap-3 md:gap-5 ${
                gridSize === "compact"
                  ? "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                  : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link to={`/shop/${product.slug}`}>
                      <div className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-3 md:p-4 group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Tags */}
                          {product.tags.length > 0 && (
                            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                              {product.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-1.5 py-0.5 bg-foreground text-background text-[9px] md:text-[10px] font-medium rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="p-3 md:p-4">
                          <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                            {product.category}
                          </span>
                          <h3 className="font-semibold text-xs md:text-sm leading-tight mt-0.5 line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs md:text-sm font-bold text-primary mt-1.5">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-sm mb-2">No products found</p>
              <p className="text-muted-foreground text-xs">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Outfit CTA */}
      <section className="py-12 md:py-16 bg-foreground">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/10 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-background/60">
                  Team Builder
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-background mb-2">
                Design Your Custom Outfit
              </h2>
              <p className="text-background/60 text-sm md:text-base max-w-lg">
                Build fully custom uniforms for your team — choose your sport, style, colors, and add your roster. All sublimated, all yours.
              </p>
            </div>
            <Link
              to="/custom-team-outfit"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-background text-foreground font-bold rounded-xl hover:bg-background/90 transition-colors text-sm md:text-base"
            >
              Start Designing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-foreground">Need Bulk.</span>{" "}
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
