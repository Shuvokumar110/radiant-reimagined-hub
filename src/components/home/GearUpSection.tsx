import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

import tidiLogo from "@/assets/tidi-logo.webp";

export function GearUpSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-foreground text-background flex flex-col justify-center overflow-hidden relative">
      {/* Animated background circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-background/10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/10"
      />

      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">
        <motion.div
          style={{ scale, opacity }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            className="h-0.5 bg-background/50 mx-auto mb-8"
          />

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Gear Up Your Team Today
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-background/70 text-lg mb-10"
          >
            Premium quality materials. Custom designs. Fast delivery worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground px-10 py-4 text-base font-semibold tracking-wide uppercase transition-all rounded group hover:gap-5"
            >
              Request Quote
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Think It / Do It Banner - Infinite Scroll */}
      <div className="mt-20 py-8 overflow-hidden border-t border-b border-background/10">
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
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap">THINK IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap">DO IT</span>
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
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap">THINK IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap">DO IT</span>
                <img src={tidiLogo} alt="TiDi" className="h-8 md:h-12 mx-4 md:mx-6 brightness-0 invert" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
