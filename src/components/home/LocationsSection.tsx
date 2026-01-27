import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import worldMap from "@/assets/world-map.png";

const locations = [
  { name: "TiDi USA", x: "22%", y: "42%", delay: 0 },
  { name: "TiDi Canada", x: "24%", y: "28%", delay: 0.2 },
  { name: "TiDi Caribbean", x: "28%", y: "52%", delay: 0.4 },
  { name: "TiDi Europe", x: "48%", y: "28%", delay: 0.6 },
  { name: "TiDi Africa", x: "50%", y: "58%", delay: 0.8 },
  { name: "TiDi Asia", x: "78%", y: "45%", delay: 1 },
];

export function LocationsSection() {
  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Global Reach
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">TiDi Locations.</span>
            <br />
            <span className="text-muted-foreground">Worldwide Delivery.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Strategic locations across the globe for fast delivery and exceptional service.
          </p>
        </motion.div>

        {/* World Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Map Image */}
          <img
            src={worldMap}
            alt="TiDi Global Locations"
            className="w-full h-auto"
          />

          {/* Animated Location Markers */}
          {locations.map((location) => (
            <motion.div
              key={location.name}
              className="absolute"
              style={{ left: location.x, top: location.y }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: location.delay, type: "spring", stiffness: 200 }}
            >
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 -m-4 rounded-full bg-destructive/30"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: location.delay }}
              />
              
              {/* Marker */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="relative z-10 cursor-pointer group"
              >
                <MapPin className="h-6 w-6 text-destructive fill-destructive drop-shadow-lg" />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl">
                    {location.name}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Animated Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* USA to Europe */}
            <motion.path
              d="M 24 42 Q 36 25, 48 28"
              stroke="hsl(var(--destructive))"
              strokeWidth="0.15"
              fill="none"
              strokeDasharray="1,1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.2 }}
            />
            {/* Europe to Asia */}
            <motion.path
              d="M 48 28 Q 63 30, 78 45"
              stroke="hsl(var(--destructive))"
              strokeWidth="0.15"
              fill="none"
              strokeDasharray="1,1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.5 }}
            />
            {/* USA to Africa */}
            <motion.path
              d="M 28 52 Q 39 55, 50 58"
              stroke="hsl(var(--destructive))"
              strokeWidth="0.15"
              fill="none"
              strokeDasharray="1,1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.8 }}
            />
          </svg>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "6", label: "Regions" },
            { value: "50+", label: "Countries" },
            { value: "500+", label: "Teams Served" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="text-center p-4 bg-muted rounded-xl"
            >
              <motion.span 
                className="text-3xl md:text-4xl font-serif font-bold text-foreground block"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.1, type: "spring" }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
