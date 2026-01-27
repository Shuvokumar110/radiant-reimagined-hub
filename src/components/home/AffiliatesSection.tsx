import { motion } from "framer-motion";

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
  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Our Affiliates
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Trusted by teams and organizations worldwide
          </p>
        </motion.div>

        {/* Logos Grid - Full Width */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {affiliates.map((affiliate, index) => (
            <motion.div
              key={affiliate.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.1 }}
              className="opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={affiliate.logo}
                alt={affiliate.name}
                className="h-24 md:h-32 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
