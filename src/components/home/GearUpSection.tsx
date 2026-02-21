import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import tidiLogo from "@/assets/tidi-logo.webp";
import multiSportAction from "@/assets/multi-sport-action.jpg";
import { useFadeIn, useBackgroundParallax } from "@/hooks/useGSAPAnimations";

export const GearUpSection = forwardRef<HTMLElement>(function GearUpSection(_props, ref) {
  const contentRef = useFadeIn(0);
  const bgRef = useBackgroundParallax(0.3);

  return (
    <section className="min-h-screen py-0 flex flex-col justify-center overflow-hidden relative">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 h-[120%] -top-[10%]">
          <img 
            src={multiSportAction} 
            alt="Multi-sport action" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10 py-32 text-background">
        <div ref={contentRef} className="text-center max-w-3xl mx-auto">
          {/* Line */}
          <div className="w-20 h-0.5 bg-background/50 mx-auto mb-8" />

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Gear Up Your Team Today
          </h2>
          
          <p className="text-background/70 text-lg mb-10">
            Premium quality materials. Custom designs. Fast delivery worldwide.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-background text-foreground px-10 py-4 text-base font-semibold tracking-wide uppercase transition-all rounded group hover:gap-5"
          >
            Request Quote
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Think It / Do It Banner */}
      <div className="relative z-10 py-8 overflow-hidden border-t border-b border-background/10 bg-foreground">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap text-background">THINK IT</span>
                <span className="mx-4 md:mx-6 inline-flex items-center">
                  <img src={tidiLogo} alt="TiDi Sports" className="h-8 md:h-12 w-auto" />
                </span>
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap text-background">DO IT</span>
                <span className="mx-4 md:mx-6 inline-flex items-center">
                  <img src={tidiLogo} alt="TiDi Sports" className="h-8 md:h-12 w-auto" />
                </span>
              </div>
            ))}
          </motion.div>
          <motion.div
            className="flex shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0 px-6 md:px-10">
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap text-background">THINK IT</span>
                <span className="mx-4 md:mx-6 inline-flex items-center">
                  <img src={tidiLogo} alt="TiDi Sports" className="h-8 md:h-12 w-auto" />
                </span>
                <span className="text-xl md:text-3xl font-bold tracking-wider whitespace-nowrap text-background">DO IT</span>
                <span className="mx-4 md:mx-6 inline-flex items-center">
                  <img src={tidiLogo} alt="TiDi Sports" className="h-8 md:h-12 w-auto" />
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
