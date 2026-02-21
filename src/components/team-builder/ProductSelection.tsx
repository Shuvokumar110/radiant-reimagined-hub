import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Zap, Users } from "lucide-react";
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
      <div className="flex items-center gap-3 mb-8 md:mb-10">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{sportInfo?.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {viewMode === 'choose' && 'Choose how you want to order'}
            {viewMode === 'kits' && 'Select a full kit'}
            {viewMode === 'separated' && 'Select individual items'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Choose mode */}
        {hasCategories && viewMode === 'choose' && (
          <motion.div
            key="choose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-3 md:gap-5 max-w-3xl"
          >
            {/* Full Kits Card */}
            <button
              onClick={() => setViewMode('kits')}
              className="group relative rounded-xl overflow-hidden text-left transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] md:aspect-[3/2] relative bg-foreground">
                {/* Show first kit image as preview */}
                {fullKits[0] && (
                  <img
                    src={fullKits[0].image}
                    alt="Full Kit Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-background">Full Kits</h3>
                  <p className="text-xs md:text-sm text-background/60 mt-1 hidden sm:block">
                    Jersey + Shorts + Socks
                  </p>
                  <span className="text-[11px] md:text-xs text-background/40 mt-2">
                    {fullKits.length} styles
                  </span>
                </div>
              </div>
            </button>

            {/* Individual Items Card */}
            <button
              onClick={() => setViewMode('separated')}
              className="group relative rounded-xl overflow-hidden text-left transition-all hover:shadow-lg border border-border"
            >
              <div className="aspect-[4/3] md:aspect-[3/2] relative bg-muted">
                {separated[0] && (
                  <img
                    src={separated[0].image}
                    alt="Individual Items Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">Individual Items</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 hidden sm:block">
                    Pick items separately
                  </p>
                  <span className="text-[11px] md:text-xs text-muted-foreground/60 mt-2">
                    {separated.length} items
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Full Kits Grid */}
        {viewMode === 'kits' && (
          <motion.div
            key="kits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductGrid products={fullKits} dispatch={dispatch} />
          </motion.div>
        )}

        {/* Separated Grid */}
        {viewMode === 'separated' && (
          <motion.div
            key="separated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-10"
          >
            {(['Jersey', 'Shorts', 'Socks'] as const).map(cat => {
              const items = separated.filter(p => p.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    {cat === 'Jersey' ? 'Jerseys' : cat}
                    <span className="ml-2 text-xs font-normal normal-case tracking-normal">({items.length})</span>
                  </h3>
                  <ProductGrid products={items} dispatch={dispatch} />
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Flat fallback */}
        {!hasCategories && viewMode === 'choose' && (
          <motion.div
            key="flat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.04 * Math.min(index, 8) }}
          whileHover={{ y: -3 }}
          className="group"
        >
          <button
            onClick={() => dispatch({ type: 'SET_PRODUCT', product })}
            className="w-full text-left"
          >
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-[4/3] mb-2 shadow-sm group-hover:shadow-md transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <Badge variant="secondary" className="bg-background/90 text-foreground text-[10px] px-1.5 py-0.5">
                  {product.fabricType}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`text-[10px] px-1.5 py-0.5 ${
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
                <span className="px-2 py-1 bg-background rounded-full text-[11px] font-semibold">
                  ${product.basePrice}/ea
                </span>
              </div>
            </div>
            <h3 className="text-sm font-semibold mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {product.shortDescription}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Users className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">Min. {product.moq} units</span>
            </div>
          </button>
        </motion.div>
      ))}
    </div>
  );
}
