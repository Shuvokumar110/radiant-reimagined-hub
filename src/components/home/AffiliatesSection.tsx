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
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Our Affiliates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by teams and organizations worldwide
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Duplicate the affiliates for seamless loop */}
            {[...affiliates, ...affiliates, ...affiliates, ...affiliates].map((affiliate, index) => (
              <motion.div
                key={`${affiliate.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={affiliate.logo}
                  alt={affiliate.name}
                  className="h-20 w-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
