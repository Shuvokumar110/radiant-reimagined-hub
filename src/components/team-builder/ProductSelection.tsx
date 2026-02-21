import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap, Users, Package, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { productsBySport, sportCategories, ProductType, ProductCategory } from "@/data/teamBuilderData";

const categoryOrder: (ProductCategory | undefined)[] = ['Full Kit', 'Jersey', 'Shorts', 'Socks', 'Warmup', 'Uniform', 'Accessory', 'Outerwear', 'Headwear'];

const categoryLabels: Record<string, { label: string; icon: typeof Package }> = {
  'Full Kit': { label: 'Full Kit Bundles', icon: Package },
  'Jersey': { label: 'Jerseys', icon: Shirt },
  'Shorts': { label: 'Shorts', icon: Shirt },
  'Socks': { label: 'Socks', icon: Shirt },
  'Warmup': { label: 'Warmups', icon: Shirt },
  'Uniform': { label: 'Uniforms', icon: Shirt },
  'Accessory': { label: 'Accessories', icon: Shirt },
  'Outerwear': { label: 'Outerwear', icon: Shirt },
  'Headwear': { label: 'Headwear', icon: Shirt },
};

function groupProducts(products: ProductType[]) {
  const grouped: Record<string, ProductType[]> = {};
  for (const p of products) {
    const cat = p.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }
  // Sort by categoryOrder
  const sorted: { category: string; products: ProductType[] }[] = [];
  for (const cat of categoryOrder) {
    const key = cat || 'Other';
    if (grouped[key]) {
      sorted.push({ category: key, products: grouped[key] });
      delete grouped[key];
    }
  }
  // Any remaining
  for (const [key, prods] of Object.entries(grouped)) {
    sorted.push({ category: key, products: prods });
  }
  return sorted;
}

export function ProductSelection() {
  const { state, dispatch, prevStep } = useTeamBuilder();
  const { sport } = state;
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  if (!sport) return null;

  const products = productsBySport[sport];
  const sportInfo = sportCategories.find(s => s.id === sport);
  const grouped = groupProducts(products);
  
  // Check if products have categories (soccer does, others may not yet)
  const hasCategories = products.some(p => p.category);

  // Filter chips
  const availableCategories = grouped.map(g => g.category);

  const filteredGroups = activeFilter 
    ? grouped.filter(g => g.category === activeFilter) 
    : grouped;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevStep}
          className="rounded-full shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{sportInfo?.name}</h2>
          <p className="text-sm md:text-base text-muted-foreground">Select a product type</p>
        </div>
      </div>

      {/* Filter Chips */}
      {hasCategories && availableCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
              !activeFilter 
                ? 'bg-foreground text-background' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All ({products.length})
          </button>
          {availableCategories.map(cat => {
            const count = grouped.find(g => g.category === cat)?.products.length || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat === activeFilter ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition-colors ${
                  activeFilter === cat 
                    ? 'bg-foreground text-background' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {categoryLabels[cat]?.label || cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Grouped Products */}
      {hasCategories ? (
        <div className="space-y-8 md:space-y-12">
          {filteredGroups.map(({ category, products: catProducts }) => (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                {category === 'Full Kit' ? (
                  <Package className="w-5 h-5 text-primary" />
                ) : (
                  <Shirt className="w-4 h-4 text-muted-foreground" />
                )}
                <h3 className={`font-semibold ${
                  category === 'Full Kit' 
                    ? 'text-lg md:text-xl' 
                    : 'text-base md:text-lg text-muted-foreground'
                }`}>
                  {categoryLabels[category]?.label || category}
                </h3>
                <span className="text-xs text-muted-foreground">({catProducts.length})</span>
              </div>
              <ProductGrid products={catProducts} dispatch={dispatch} />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={products} dispatch={dispatch} />
      )}
    </div>
  );
}

function ProductGrid({ products, dispatch }: { products: ProductType[]; dispatch: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 * Math.min(index, 8) }}
          whileHover={{ y: -4 }}
          className="group"
        >
          <button
            onClick={() => dispatch({ type: 'SET_PRODUCT', product })}
            className="w-full text-left"
          >
            <div className="relative bg-muted rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] mb-2 md:mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <Badge 
                  variant="secondary" 
                  className="bg-background/90 text-foreground text-[10px] md:text-xs px-1.5 py-0.5"
                >
                  {product.fabricType}
                </Badge>
                <Badge 
                  variant="secondary"
                  className={`text-[10px] md:text-xs px-1.5 py-0.5 ${
                    product.leadTime === 'Rush' 
                      ? 'bg-yellow-500/90 text-black' 
                      : 'bg-background/90 text-foreground'
                  }`}
                >
                  {product.leadTime === 'Rush' ? (
                    <><Zap className="w-2.5 h-2.5 mr-0.5" /> Rush</>
                  ) : (
                    <><Clock className="w-2.5 h-2.5 mr-0.5" /> Std</>
                  )}
                </Badge>
              </div>

              {/* Price */}
              <div className="absolute bottom-2 right-2">
                <span className="px-2 py-1 bg-background rounded-full text-xs md:text-sm font-semibold">
                  ${product.basePrice}/ea
                </span>
              </div>
            </div>

            <h3 className="text-sm md:text-base font-semibold mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">
              {product.shortDescription}
            </p>
            {/* MOQ */}
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] md:text-xs text-muted-foreground">
                Min. {product.moq} units
              </span>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
