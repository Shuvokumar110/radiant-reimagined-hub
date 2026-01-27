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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Our Affiliates
          </h2>
        </motion.div>

        {/* Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {affiliates.map((affiliate, index) => (
            <motion.div
              key={affiliate.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <img
                src={affiliate.logo}
                alt={affiliate.name}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
