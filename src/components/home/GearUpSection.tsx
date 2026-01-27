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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
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

      {/* Think It / Do It Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 bg-foreground text-background py-10"
      >
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            <span className="text-2xl md:text-4xl font-serif font-bold tracking-wide">THINK IT</span>
            <img src={tidiLogo} alt="TiDi" className="h-10 md:h-14 invert" />
            <span className="text-2xl md:text-4xl font-serif font-bold tracking-wide">DO IT</span>
            <img src={tidiLogo} alt="TiDi" className="h-10 md:h-14 invert" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
