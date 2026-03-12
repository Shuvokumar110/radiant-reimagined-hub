import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Zap, Users, Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { productsBySport, sportCategories, ProductType } from "@/data/teamBuilderData";
import { getProductGalleryImages, GalleryImage } from "@/data/productGalleryImages";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ViewMode = 'choose' | 'kits' | 'jerseys' | 'shorts' | 'socks';

export function ProductSelection() {
  const { state, dispatch, prevStep } = useTeamBuilder();
  const { sport } = state;
  const [viewMode, setViewMode] = useState<ViewMode>('choose');

  if (!sport) return null;

  const allProducts = productsBySport[sport];
  const sportInfo = sportCategories.find(s => s.id === sport);
  const hasCategories = allProducts.some(p => p.category);

  const fullKits = allProducts.filter(p => p.category === 'Full Kit');
  const jerseys = allProducts.filter(p => p.category === 'Jersey');
  const shorts = allProducts.filter(p => p.category === 'Shorts');
  const socks = allProducts.filter(p => p.category === 'Socks');

  const handleBack = () => {
    if (viewMode === 'choose') {
      prevStep();
    } else if (viewMode === 'kits' || viewMode === 'jerseys') {
      setViewMode('choose');
    } else if (viewMode === 'shorts') {
      setViewMode('jerseys');
    } else if (viewMode === 'socks') {
      setViewMode('shorts');
    }
  };

  const handleProductSelect = (product: ProductType) => {
    if (viewMode === 'kits') {
      dispatch({ type: 'SET_ORDER_MODE', mode: 'kit' });
      dispatch({ type: 'SET_PRODUCT', product });
    } else if (viewMode === 'jerseys') {
      dispatch({ type: 'SET_INDIVIDUAL_SELECTION', itemType: 'jersey', product });
      setViewMode('shorts');
    } else if (viewMode === 'shorts') {
      dispatch({ type: 'SET_INDIVIDUAL_SELECTION', itemType: 'shorts', product });
      setViewMode('socks');
    } else if (viewMode === 'socks') {
      dispatch({ type: 'SET_INDIVIDUAL_SELECTION', itemType: 'socks', product });
      dispatch({ type: 'SET_ORDER_MODE', mode: 'individual' });
      const jersey = state.individualSelections.jersey;
      if (jersey) {
        dispatch({ type: 'SET_PRODUCT', product: jersey });
      } else {
        dispatch({ type: 'SET_PRODUCT', product });
      }
    }
  };

  const stepIndex = viewMode === 'jerseys' ? 0 : viewMode === 'shorts' ? 1 : viewMode === 'socks' ? 2 : -1;
  const usesPants = sport === 'american_football' || sport === 'cricket' || sport === 'baseball_softball';
  const bottomLabel = usesPants ? 'Pants' : 'Shorts';
  const stepLabels = ['Jersey', bottomLabel, 'Socks'];

  const getSubtitle = () => {
    switch (viewMode) {
      case 'choose': return 'Choose how you want to order';
      case 'kits': return 'Select a full kit';
      case 'jerseys': return 'Step 1 of 3 — Select a jersey';
      case 'shorts': return `Step 2 of 3 — Select ${usesPants ? 'pants' : 'shorts'}`;
      case 'socks': return 'Step 3 of 3 — Select socks';
    }
  };

  const getProducts = () => {
    switch (viewMode) {
      case 'kits': return fullKits;
      case 'jerseys': return jerseys;
      case 'shorts': return shorts;
      case 'socks': return socks;
      default: return allProducts;
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
          <p className="text-sm text-muted-foreground mt-0.5">{getSubtitle()}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Choose: Full Kits vs Individual */}
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
              onClick={() => {
                dispatch({ type: 'SET_ORDER_MODE', mode: 'individual' });
                setViewMode('jerseys');
              }}
              className="flex-1 group relative rounded-2xl bg-background text-foreground p-8 md:p-10 text-left transition-all hover:shadow-2xl hover:scale-[1.01] border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-medium">Mix &amp; Match</span>
                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground/70 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Individual</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Pick jerseys, shorts and socks one at a time.
              </p>
              <div className="mt-6 pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{jerseys.length + shorts.length + socks.length} items available</span>
              </div>
            </button>
          </motion.div>
        )}

        {/* Sequential individual steps & kit grid */}
        {(viewMode === 'kits' || viewMode === 'jerseys' || viewMode === 'shorts' || viewMode === 'socks') && (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Mini step progress for individual flow */}
            {stepIndex >= 0 && (
              <div className="flex items-center gap-3 mb-8 max-w-sm">
                {stepLabels.map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className="flex flex-col flex-1 gap-1">
                      <span className={`text-[10px] font-medium ${
                        i <= stepIndex ? 'text-foreground' : 'text-muted-foreground/50'
                      }`}>
                        {label}
                      </span>
                      <div className={`h-1 rounded-full transition-colors ${
                        i <= stepIndex ? 'bg-foreground' : 'bg-border'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ProductGrid products={getProducts()} onSelect={handleProductSelect} sport={sport} />
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
            <ProductGrid products={allProducts} onSelect={(p) => dispatch({ type: 'SET_PRODUCT', product: p })} sport={sport} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductGrid({ products, onSelect, sport }: { products: ProductType[]; onSelect: (p: ProductType) => void; sport: string }) {
  const [galleryProduct, setGalleryProduct] = useState<{ product: ProductType; images: GalleryImage[] } | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (e: React.MouseEvent, product: ProductType) => {
    e.stopPropagation();
    const images = getProductGalleryImages(product.id, sport);
    if (images.length > 0) {
      setGalleryProduct({ product, images });
      setActiveImageIndex(0);
    }
  };

  const closeGallery = () => {
    setGalleryProduct(null);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (galleryProduct) {
      setActiveImageIndex((prev) => (prev + 1) % galleryProduct.images.length);
    }
  };

  const prevImage = () => {
    if (galleryProduct) {
      setActiveImageIndex((prev) => (prev - 1 + galleryProduct.images.length) % galleryProduct.images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {products.map((product, index) => {
          const galleryImages = getProductGalleryImages(product.id, sport);
          const hasGallery = galleryImages.length > 1;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.04 * Math.min(index, 8) }}
              whileHover={{ y: -3 }}
              className="group"
            >
              <button
                onClick={() => onSelect(product)}
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
                  {/* View All Images button */}
                  {hasGallery && (
                    <div
                      className="absolute bottom-2 left-2"
                      onClick={(e) => openGallery(e, product)}
                    >
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-foreground/80 text-background rounded-full text-[10px] font-medium cursor-pointer hover:bg-foreground transition-colors">
                        <Images className="w-3 h-3" />
                        View All Images
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.shortDescription}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Min. {product.moq} units</span>
                  </div>
                  {hasGallery && (
                    <span
                      className="text-[10px] text-primary underline cursor-pointer hover:text-primary/80 md:hidden"
                      onClick={(e) => openGallery(e, product)}
                    >
                      View all images
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Gallery Modal */}
      <Dialog open={!!galleryProduct} onOpenChange={(open) => !open && closeGallery()}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2 border-b border-border">
            <DialogTitle className="text-lg font-bold">
              {galleryProduct?.product.name} — All Views
            </DialogTitle>
          </DialogHeader>

          {galleryProduct && (
            <div className="flex flex-col md:flex-row h-full min-h-0">
              {/* Main Image */}
              <div className="flex-1 relative bg-muted flex items-center justify-center p-4 min-h-[300px] md:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={galleryProduct.images[activeImageIndex].image}
                    alt={galleryProduct.images[activeImageIndex].label}
                    className="max-w-full max-h-[50vh] md:max-h-[60vh] object-contain"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {galleryProduct.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 hover:bg-background flex items-center justify-center shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Active label */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1.5 bg-foreground/80 text-background text-xs font-medium rounded-full">
                    {galleryProduct.images[activeImageIndex].label}
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="md:w-48 border-t md:border-t-0 md:border-l border-border bg-background p-3 overflow-y-auto">
                <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                  {galleryProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                        i === activeImageIndex
                          ? 'border-primary ring-1 ring-primary'
                          : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img
                        src={img.image}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 right-0 bg-foreground/70 text-background text-[8px] text-center py-0.5 leading-tight">
                        {img.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
