import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function LocationsSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              TiDi Locations
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              With headquarters in the USA and manufacturing partners across the globe, 
              TiDi Apparel delivers premium athletic wear to teams worldwide. Our strategic 
              locations ensure fast delivery and exceptional service no matter where you're based.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium">USA Headquarters</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium">Italy Manufacturing</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium">Global Distribution</span>
              </div>
            </div>
          </motion.div>

          {/* Right - World Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-muted rounded-lg p-6 overflow-hidden">
              {/* Simple World Map SVG */}
              <svg viewBox="0 0 1000 500" className="w-full h-auto opacity-20">
                <path
                  d="M150,200 Q200,150 250,180 Q300,210 350,190 Q400,170 450,200 Q500,230 550,210 Q600,190 650,220 Q700,250 750,230 Q800,210 850,240"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <ellipse cx="200" cy="200" rx="80" ry="100" fill="currentColor" opacity="0.3" />
                <ellipse cx="550" cy="180" rx="120" ry="80" fill="currentColor" opacity="0.3" />
                <ellipse cx="800" cy="220" rx="100" ry="70" fill="currentColor" opacity="0.3" />
              </svg>

              {/* Location Dots */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/3 left-1/4 w-3 h-3 bg-destructive rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/4 left-1/2 w-3 h-3 bg-destructive rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 right-1/4 w-3 h-3 bg-destructive rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
