import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { CatalogDownloadBanner } from "@/components/shop/CatalogDownloadButton";
import { ShopFilterSidebar } from "@/components/shop/ShopFilterSidebar";
import {
  Search, SlidersHorizontal, Grid3X3, LayoutGrid, X, ArrowRight,
} from "lucide-react";
import { products } from "@/data/products";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [gridSize, setGridSize] = useState<"compact" | "comfortable">("comfortable");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleMaterialToggle = (mat: string) => {
    setActiveMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleClearAll = () => {
    setActiveCategory("All");
    setActiveTags([]);
    setActiveMaterials([]);
    setSortBy("featured");
    searchParams.delete("category");
    setSearchParams(searchParams);
  };

  const activeFilterCount =
    (activeCategory !== "All" ? 1 : 0) + activeTags.length + activeMaterials.length;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeTags.length > 0) {
      result = result.filter((p) =>
        activeTags.some((tag) => p.tags.includes(tag))
      );
    }

    if (activeMaterials.length > 0) {
      result = result.filter((p) => activeMaterials.includes(p.material));
    }

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
  }, [activeCategory, searchQuery, sortBy, activeTags, activeMaterials]);

  const sidebarContent = (
    <ShopFilterSidebar
      activeCategory={activeCategory}
      onCategoryChange={handleCategoryChange}
      activeTags={activeTags}
      onTagToggle={handleTagToggle}
      activeMaterials={activeMaterials}
      onMaterialToggle={handleMaterialToggle}
      sortBy={sortBy}
      onSortChange={setSortBy}
      onClearAll={handleClearAll}
      activeFilterCount={activeFilterCount}
    />
  );

  return (
    <Layout>
      {/* Custom Outfit CTA */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-10 bg-foreground">
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
                Build fully custom uniforms for your team — choose your sport, style, colors, and add your roster.
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

      {/* Hero */}
      <section className="py-8 md:py-10 bg-foreground text-background">
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

      {/* Toolbar */}
      <section className="sticky top-16 md:top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-border rounded-lg hover:bg-muted transition-colors relative">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-foreground text-background text-[9px] font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-left">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">{sidebarContent}</div>
              </SheetContent>
            </Sheet>

            {/* Results count */}
            <p className="hidden md:block text-xs text-muted-foreground whitespace-nowrap">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
            </p>

            {/* Grid Toggle */}
            <div className="hidden md:flex items-center border border-border rounded-lg overflow-hidden ml-auto">
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
        </div>
      </section>

      {/* Main: Sidebar + Products */}
      <section className="bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-8 py-8 md:py-10">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-56 lg:w-60 shrink-0">
              <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-hide">
                {sidebarContent}
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1 min-w-0">
              {/* Active Filters Chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {activeCategory !== "All" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted rounded-full text-[11px] font-medium">
                      {activeCategory}
                      <button onClick={() => handleCategoryChange("All")}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {activeTags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted rounded-full text-[11px] font-medium">
                      {tag}
                      <button onClick={() => handleTagToggle(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  {activeMaterials.map((mat) => (
                    <span key={mat} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted rounded-full text-[11px] font-medium">
                      {mat}
                      <button onClick={() => handleMaterialToggle(mat)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button onClick={handleClearAll} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors ml-1">
                    Clear all
                  </button>
                </div>
              )}

              {/* Mobile results count */}
              <p className="md:hidden text-xs text-muted-foreground mb-4">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>

              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className={`grid gap-3 md:gap-4 ${
                    gridSize === "compact"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
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
                  <p className="text-muted-foreground text-xs">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
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
