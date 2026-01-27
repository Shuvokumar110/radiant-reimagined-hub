import { motion, useScroll, useTransform } from "framer-motion";
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

export function AffiliatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-background flex flex-col justify-center overflow-hidden relative">
      {/* Background circle decoration */}
      <motion.div
        style={{ rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/30 rounded-full pointer-events-none"
      />
      <motion.div
        style={{ rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/20 rounded-full pointer-events-none"
      />

      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-xl font-bold">{affiliates.length}</span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Our Affiliates
          </h2>
          <p className="text-muted-foreground">
            Trusted by teams and organizations worldwide
          </p>
        </motion.div>

        {/* Orbital Logo Display */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center piece */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-foreground rounded-full flex items-center justify-center z-20"
          >
            <div className="text-center text-background">
              <span className="text-3xl font-bold">500+</span>
              <p className="text-xs">Teams</p>
            </div>
          </motion.div>

          {/* Logos in orbital arrangement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20">
            {affiliates.map((affiliate, index) => (
              <motion.div
                key={affiliate.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  className="bg-background border border-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={affiliate.logo}
                    alt={affiliate.name}
                    className="h-20 w-auto object-contain mx-auto"
                  />
                </motion.div>
                <motion.p 
                  className="text-xs text-muted-foreground mt-3 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {affiliate.name}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-12 mt-8"
        >
          {[
            { label: "Countries", value: "50+" },
            { label: "Years", value: "15+" },
            { label: "Products", value: "1000+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
