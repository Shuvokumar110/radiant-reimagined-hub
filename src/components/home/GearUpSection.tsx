import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import tidiLogo from "@/assets/tidi-logo.webp";

export function GearUpSection() {
  return (
    <section className="min-h-screen py-20 bg-muted flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Gear Up Your Team Today
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Get custom team apparel, jerseys, and soccer boots crafted with premium quality materials. 
            Start your order today and elevate your team's look.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-destructive hover:bg-destructive/90 text-white px-10 py-4 text-base font-semibold tracking-wide uppercase transition-colors rounded"
          >
            Request Quote
          </Link>
        </motion.div>
      </div>

      {/* Think It / Do It Banner - Infinite Scroll */}
      <div className="mt-20 bg-foreground text-background py-6 overflow-hidden">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* First set */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-serif font-bold tracking-wider whitespace-nowrap">THINK IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
                <span className="text-xl md:text-3xl font-serif font-bold tracking-wider whitespace-nowrap">DO IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            {/* Second set for seamless loop */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-serif font-bold tracking-wider whitespace-nowrap">THINK IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
                <span className="text-xl md:text-3xl font-serif font-bold tracking-wider whitespace-nowrap">DO IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
