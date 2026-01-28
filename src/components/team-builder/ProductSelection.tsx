import { motion } from "framer-motion";
import { ArrowLeft, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { productsBySport, sportCategories } from "@/data/teamBuilderData";

export function ProductSelection() {
  const { state, dispatch, prevStep } = useTeamBuilder();
  const { sport } = state;

  if (!sport) return null;

  const products = productsBySport[sport];
  const sportInfo = sportCategories.find(s => s.id === sport);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
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

      {/* Product Grid - Mobile optimized */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
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
                
                {/* Badges - compact on mobile */}
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
                    ${product.basePrice}
                  </span>
                </div>
              </div>

              <h3 className="text-sm md:text-base font-semibold mb-0.5 group-hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {product.shortDescription}
              </p>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
