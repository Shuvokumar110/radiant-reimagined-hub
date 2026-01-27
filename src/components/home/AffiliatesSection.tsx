import { motion } from "framer-motion";

const affiliates = [
  { name: "Partner 1", logo: "https://via.placeholder.com/150x60?text=Partner+1" },
  { name: "Partner 2", logo: "https://via.placeholder.com/150x60?text=Partner+2" },
  { name: "Partner 3", logo: "https://via.placeholder.com/150x60?text=Partner+3" },
  { name: "Partner 4", logo: "https://via.placeholder.com/150x60?text=Partner+4" },
  { name: "Partner 5", logo: "https://via.placeholder.com/150x60?text=Partner+5" },
  { name: "Partner 6", logo: "https://via.placeholder.com/150x60?text=Partner+6" },
  { name: "Partner 7", logo: "https://via.placeholder.com/150x60?text=Partner+7" },
  { name: "Partner 8", logo: "https://via.placeholder.com/150x60?text=Partner+8" },
];

export function AffiliatesSection() {
  return (
    <section className="py-20 bg-muted overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center">
          <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
            Trusted By Teams Nationwide
          </span>
        </div>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted to-transparent z-10" />

        {/* Marquee Track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Duplicate the affiliates for seamless loop */}
            {[...affiliates, ...affiliates].map((affiliate, index) => (
              <motion.div
                key={`${affiliate.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={affiliate.logo}
                  alt={affiliate.name}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
