import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function LocationsSection() {
  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              TiDi Locations
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              With headquarters in the USA and manufacturing partners across the globe, 
              TiDi Apparel delivers premium athletic wear to teams worldwide. Our strategic 
              locations ensure fast delivery and exceptional service no matter where you're based.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 text-destructive" />
                <span className="font-medium">USA Headquarters</span>
              </div>
              <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 text-destructive" />
                <span className="font-medium">Italy Manufacturing</span>
              </div>
              <div className="flex items-center gap-3 bg-muted px-4 py-3 rounded-lg">
                <MapPin className="h-5 w-5 text-destructive" />
                <span className="font-medium">Global Distribution</span>
              </div>
            </div>
          </motion.div>

          {/* Right - World Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-muted rounded-2xl p-12 overflow-hidden aspect-video">
              {/* World Map Background */}
              <svg viewBox="0 0 1200 600" className="w-full h-full opacity-30">
                {/* Simplified continents */}
                <ellipse cx="250" cy="280" rx="150" ry="180" fill="currentColor" />
                <ellipse cx="550" cy="250" rx="180" ry="150" fill="currentColor" />
                <ellipse cx="900" cy="300" rx="200" ry="160" fill="currentColor" />
                <ellipse cx="350" cy="450" rx="80" ry="100" fill="currentColor" />
                <ellipse cx="950" cy="480" rx="100" ry="80" fill="currentColor" />
              </svg>

              {/* Location Markers */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[40%] left-[20%] w-4 h-4 bg-destructive rounded-full shadow-lg"
              >
                <div className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-50" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-[35%] left-[45%] w-4 h-4 bg-destructive rounded-full shadow-lg"
              >
                <div className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-50" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute top-[40%] right-[20%] w-4 h-4 bg-destructive rounded-full shadow-lg"
              >
                <div className="absolute inset-0 bg-destructive rounded-full animate-ping opacity-50" />
              </motion.div>

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <motion.path
                  d="M20 40 Q 35 25, 45 35"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
                <motion.path
                  d="M45 35 Q 60 30, 80 40"
                  stroke="hsl(var(--destructive))"
                  strokeWidth="0.3"
                  fill="none"
                  strokeDasharray="2,2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
