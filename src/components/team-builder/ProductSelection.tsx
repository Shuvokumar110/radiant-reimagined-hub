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
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevStep}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{sportInfo?.icon}</span>
            <h2 className="text-2xl md:text-3xl font-bold">{sportInfo?.name}</h2>
          </div>
          <p className="text-muted-foreground">Select a product type</p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <button
              onClick={() => dispatch({ type: 'SET_PRODUCT', product })}
              className="w-full text-left"
            >
              <div className="relative bg-muted rounded-xl overflow-hidden aspect-[4/3] mb-4 shadow-elegant group-hover:shadow-luxury transition-all">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <Badge 
                    variant="secondary" 
                    className="bg-background/90 text-foreground text-xs"
                  >
                    {product.fabricType}
                  </Badge>
                  <Badge 
                    variant="secondary"
                    className={`text-xs ${
                      product.leadTime === 'Rush' 
                        ? 'bg-yellow-500/90 text-black' 
                        : 'bg-background/90 text-foreground'
                    }`}
                  >
                    {product.leadTime === 'Rush' ? (
                      <><Zap className="w-3 h-3 mr-1" /> Rush</>
                    ) : (
                      <><Clock className="w-3 h-3 mr-1" /> Standard</>
                    )}
                  </Badge>
                </div>

                {/* Price */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1.5 bg-background rounded-full text-sm font-semibold">
                    From ${product.basePrice}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {product.shortDescription}
              </p>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
