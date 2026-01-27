import { motion } from "framer-motion";
import { useRef } from "react";

import talladegaLogo from "@/assets/affiliates/talladega-college.png";
import shenenLogo from "@/assets/affiliates/shenen-africa.png";
import nycIntercolLogo from "@/assets/affiliates/nyc-intercol.png";
import flyingFishLogo from "@/assets/affiliates/flying-fish.png";

const affiliates = [
  { name: "Talladega College Tornadoes", logo: talladegaLogo },
  { name: "Shenen Africa", logo: shenenLogo },
  { name: "NYC Intercol Tournament", logo: nycIntercolLogo },
  { name: "Flying Fish Swim Club Trinidad", logo: flyingFishLogo },
];

// Duplicate for seamless loop
const duplicatedAffiliates = [...affiliates, ...affiliates, ...affiliates];

const stats = [
  { value: "500+", label: "Teams Served" },
  { value: "50+", label: "Countries" },
  { value: "15+", label: "Years Experience" },
];

export function AffiliatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Trusted Partners
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            <span className="text-foreground">Our Partners.</span>
            <br />
            <span className="text-muted-foreground">Trusted Globally.</span>
          </motion.h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
                className="text-4xl md:text-5xl font-bold text-foreground block"
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-muted-foreground mt-1 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-border max-w-2xl mx-auto mb-16 origin-center"
        />
      </div>

      {/* Infinite Logo Marquee */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <motion.div
          className="flex gap-8 md:gap-12"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {duplicatedAffiliates.map((affiliate, index) => (
            <motion.div
              key={`${affiliate.name}-${index}`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 group"
            >
              <div className="bg-background border border-border/50 rounded-2xl px-8 py-6 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300">
                <img
                  src={affiliate.logo}
                  alt={affiliate.name}
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16 px-8"
      >
        <p className="text-muted-foreground text-sm md:text-base">
          Join the growing list of teams and organizations that trust TiDi for their apparel needs.
        </p>
      </motion.div>
    </section>
  );
}
