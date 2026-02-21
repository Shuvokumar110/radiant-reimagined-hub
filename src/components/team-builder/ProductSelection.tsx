import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { productsBySport, sportCategories, ProductType } from "@/data/teamBuilderData";

type ViewMode = 'choose' | 'kits' | 'separated' | 'jerseys' | 'shorts' | 'socks';

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
    } else if (viewMode === 'jerseys' || viewMode === 'shorts' || viewMode === 'socks') {
      setViewMode('separated');
    } else {
      setViewMode('choose');
    }
  };

  const getSubtitle = () => {
    switch (viewMode) {
      case 'choose': return 'Choose how you want to order';
      case 'kits': return 'Select a full kit';
      case 'separated': return 'What would you like to customize?';
      case 'jerseys': return 'Select a jersey style';
      case 'shorts': return 'Select a shorts style';
      case 'socks': return 'Select a socks style';
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 md:mb-12">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{sportInfo?.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {getSubtitle()}
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
            className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-2xl mx-auto"
          >
            <button
              onClick={() => setViewMode('kits')}
              className="flex-1 group relative rounded-2xl bg-foreground text-background p-8 md:p-10 text-left transition-all hover:shadow-2xl hover:scale-[1.01]"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.15em] text-background/40 font-medium">Recommended</span>
                <ArrowRight className="w-5 h-5 text-background/30 group-hover:text-background/70 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Full Kits</h3>
              <p className="text-sm text-background/50 mt-2 leading-relaxed">
                Jersey, shorts &amp; socks — bundled and matched.
              </p>
              <div className="mt-6 pt-4 border-t border-background/10">
                <span className="text-xs text-background/40">{fullKits.length} styles available</span>
              </div>
            </button>

            <button
              onClick={() => setViewMode('separated')}
              className="flex-1 group relative rounded-2xl bg-background text-foreground p-8 md:p-10 text-left transition-all hover:shadow-2xl hover:scale-[1.01] border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Mix &amp; Match</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Individual</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Pick jerseys, shorts and socks separately.
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{separated.length} items available</span>
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

        {/* Separated - category chooser */}
        {viewMode === 'separated' && (
          <motion.div
            key="separated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-3xl mx-auto"
          >
            {([
              { key: 'jerseys' as ViewMode, label: 'Jerseys', cat: 'Jersey' },
              { key: 'shorts' as ViewMode, label: 'Shorts', cat: 'Shorts' },
              { key: 'socks' as ViewMode, label: 'Socks', cat: 'Socks' },
            ]).map(({ key, label, cat }) => {
              const items = separated.filter(p => p.category === cat);
              return (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  className="flex-1 group rounded-2xl bg-background text-foreground p-8 md:p-10 text-left transition-all hover:shadow-2xl hover:scale-[1.01] border border-border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Step</span>
                    <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">{label}</h3>
                  <div className="mt-4 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">{items.length} styles</span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Individual category grids */}
        {(viewMode === 'jerseys' || viewMode === 'shorts' || viewMode === 'socks') && (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProductGrid
              products={separated.filter(p =>
                (viewMode === 'jerseys' && p.category === 'Jersey') ||
                (viewMode === 'shorts' && p.category === 'Shorts') ||
                (viewMode === 'socks' && p.category === 'Socks')
              )}
              dispatch={dispatch}
            />
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
            <div className="relative bg-muted rounded-xl overflow-hidden aspect-[4/3] mb-2.5 shadow-sm group-hover:shadow-lg transition-all">
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
