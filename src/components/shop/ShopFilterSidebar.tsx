import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { categories as productCategories } from "@/data/products";

interface FilterSidebarProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  activeMaterials: string[];
  onMaterialToggle: (mat: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

const allTags = [
  "Made in Italy",
  "Kangaroo Leather",
  "Calf Leather",
  "Special Edition",
  "Limited",
];

const allMaterials = [
  "Kangaroo Leather",
  "Calf Leather",
];

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left mb-2"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-foreground">
          {title}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ShopFilterSidebar({
  activeCategory,
  onCategoryChange,
  activeTags,
  onTagToggle,
  activeMaterials,
  onMaterialToggle,
  sortBy,
  onSortChange,
  onClearAll,
  activeFilterCount,
}: FilterSidebarProps) {
  return (
    <div className="space-y-0">
      {/* Clear All */}
      {activeFilterCount > 0 && (
        <div className="pb-4 mb-4 border-b border-border">
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all filters ({activeFilterCount})
          </button>
        </div>
      )}

      {/* Sort */}
      <FilterSection title="Sort By">
        <div className="space-y-1">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                sortBy === opt.value
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-1">
          {productCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Tags */}
      <FilterSection title="Tags" defaultOpen={false}>
        <div className="space-y-1">
          {allTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <div
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-foreground border-foreground"
                      : "border-border"
                  }`}
                >
                  {isActive && (
                    <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={isActive ? "text-foreground font-medium" : ""}>{tag}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Material */}
      <FilterSection title="Material" defaultOpen={false}>
        <div className="space-y-1">
          {allMaterials.map((mat) => {
            const isActive = activeMaterials.includes(mat);
            return (
              <button
                key={mat}
                onClick={() => onMaterialToggle(mat)}
                className="w-full text-left flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <div
                  className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                    isActive
                      ? "bg-foreground border-foreground"
                      : "border-border"
                  }`}
                >
                  {isActive && (
                    <svg className="w-2.5 h-2.5 text-background" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className={isActive ? "text-foreground font-medium" : ""}>{mat}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}
