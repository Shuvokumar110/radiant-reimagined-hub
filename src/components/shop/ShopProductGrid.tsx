import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInUp } from "@/components/ui/animated-text";

interface ShopProduct {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  basePrice: number;
  category?: string;
}

interface ShopProductGridProps {
  products: ShopProduct[];
  categoryName: string;
}

export function ShopProductGrid({ products, categoryName }: ShopProductGridProps) {
  if (products.length === 0) {
    return (
      <FadeInUp>
        <div className="text-center py-12 md:py-16">
          <p className="text-muted-foreground text-sm md:text-base">
            No products available for this category yet. Contact us for custom orders.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center mt-4 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors text-sm"
          >
            Request a Quote
          </Link>
        </div>
      </FadeInUp>
    );
  }

  // Group by sub-category if available
  const grouped = products.reduce<Record<string, ShopProduct[]>>((acc, p) => {
    const cat = p.category || "All";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categoryOrder = ["Full Kit", "Jersey", "Shorts", "Socks", "Warmup", "Uniform", "Outerwear", "Accessory", "Headwear"];
  const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
    const ai = categoryOrder.indexOf(a);
    const bi = categoryOrder.indexOf(b);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryName}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
        className="space-y-8 md:space-y-10"
      >
        {sortedGroups.map(([groupName, items]) => (
          <div key={groupName}>
            {sortedGroups.length > 1 && (
              <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">
                {groupName}
              </h3>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {items.map((product) => (
                <motion.div
                  key={product.id}
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
                  </div>
                  <div className="p-3 md:p-4">
                    <h4 className="font-semibold text-xs md:text-sm leading-tight line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1 line-clamp-1">
                      {product.shortDescription}
                    </p>
                    <p className="text-xs md:text-sm font-bold text-primary mt-2">
                      From ${product.basePrice}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Quote CTA for category */}
        <div className="bg-muted rounded-xl p-4 md:p-6 text-center">
          <p className="text-sm md:text-base font-medium mb-3">
            Need custom {categoryName} gear? Get team pricing.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors text-sm"
          >
            Request a Quote
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
