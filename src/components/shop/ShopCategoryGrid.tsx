import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

interface ShopCategory {
  id: string;
  name: string;
  image: string;
}

interface ShopCategoryGridProps {
  categories: ShopCategory[];
  activeCategory: string | null;
  onCategoryClick: (id: string) => void;
}

export function ShopCategoryGrid({ categories, activeCategory, onCategoryClick }: ShopCategoryGridProps) {
  return (
    <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <StaggerItem key={category.id}>
            <button
              onClick={() => onCategoryClick(category.id)}
              className="group block w-full text-left"
            >
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? "border-foreground shadow-lg ring-2 ring-foreground/20"
                    : "border-border hover:border-foreground/30 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-foreground/10"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                    <h3 className="font-bold text-xs md:text-sm text-white leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            </button>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
