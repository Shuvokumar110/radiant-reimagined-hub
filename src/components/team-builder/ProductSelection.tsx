import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Zap, Users, Package, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { productsBySport, sportCategories, ProductType } from "@/data/teamBuilderData";

type ViewMode = 'choose' | 'kits' | 'separated';

export function ProductSelection() {
  const { state, dispatch, prevStep } = useTeamBuilder();
  const { sport } = state;
  const [viewMode, setViewMode] = useState<ViewMode>('choose');

  if (!sport) return null;

  const allProducts = productsBySport[sport];
  const sportInfo = sportCategories.find(s => s.id === sport);
  const hasCategories = allProducts.some(p => p.category);

  const fullKits = allProducts.filter(p => p.category === 'Full Kit');
  const separated = allProducts.filter(p => p.category && p.category !== 'Full Kit');

  const handleBack = () => {
    if (viewMode === 'choose') {
      prevStep();
    } else {
      setViewMode('choose');
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{sportInfo?.name}</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            {viewMode === 'choose' && 'How would you like to order?'}
            {viewMode === 'kits' && 'Select a full kit bundle'}
            {viewMode === 'separated' && 'Select individual items'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Option selection */}
        {hasCategories && viewMode === 'choose' && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto"
          >
            <button
              onClick={() => setViewMode('kits')}
              className="group relative bg-foreground text-background rounded-2xl p-6 md:p-8 text-left hover:scale-[1.02] transition-transform"
            >
              <Package className="w-10 h-10 md:w-12 md:h-12 mb-4 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Full Kits</h3>
              <p className="text-sm md:text-base text-background/70">
                Jersey + Shorts + Socks bundled together
              </p>
              <span className="inline-block mt-3 text-xs md:text-sm text-background/50">
                {fullKits.length} options available
              </span>
            </button>

            <button
              onClick={() => setViewMode('separated')}
              className="group relative bg-muted text-foreground rounded-2xl p-6 md:p-8 text-left hover:scale-[1.02] transition-transform border border-border"
            >
              <Layers className="w-10 h-10 md:w-12 md:h-12 mb-4 text-muted-foreground" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Individual Items</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Pick jerseys, shorts, and socks separately
              </p>
              <span className="inline-block mt-3 text-xs md:text-sm text-muted-foreground/70">
                {separated.length} options available
              </span>
            </button>
          </motion.div>
        )}

        {/* Full Kits view */}
        {viewMode === 'kits' && (
          <motion.div
            key="kits"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductGrid products={fullKits} dispatch={dispatch} />
          </motion.div>
        )}

        {/* Separated view - grouped by type */}
        {viewMode === 'separated' && (
          <motion.div
            key="separated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-10 md:space-y-14"
          >
            {(['Jersey', 'Shorts', 'Socks'] as const).map(cat => {
              const items = separated.filter(p => p.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="text-base md:text-lg font-semibold text-muted-foreground mb-4">
                    {cat === 'Jersey' ? 'Jerseys' : cat} <span className="text-xs font-normal">({items.length})</span>
                  </h3>
                  <ProductGrid products={items} dispatch={dispatch} />
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Fallback for sports without categories */}
        {!hasCategories && viewMode === 'choose' && (
          <motion.div
            key="flat"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductGrid products={allProducts} dispatch={dispatch} />
          </motion.div>
        )}
      </AnimatePresence>
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
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <Badge variant="secondary" className="bg-background/90 text-foreground text-[10px] md:text-xs px-1.5 py-0.5">
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
