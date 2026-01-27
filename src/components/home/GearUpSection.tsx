import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import tidiLogo from "@/assets/tidi-logo.webp";

export function GearUpSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            Gear Up Your Team Today
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
            Get custom team apparel, jerseys, and soccer boots crafted with premium quality materials. 
            Start your order today and elevate your team's look.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-destructive hover:bg-destructive/90 text-white px-8 py-3 text-sm font-medium tracking-wide uppercase transition-colors rounded"
          >
            Request Quote
          </Link>
        </motion.div>
      </div>

      {/* Think It / Do It Banner */}
      <div className="mt-12 bg-foreground text-background py-6 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-wide">THINK IT</span>
            <img src={tidiLogo} alt="TiDi" className="h-8 md:h-10 invert" />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-wide">DO IT</span>
            <img src={tidiLogo} alt="TiDi" className="h-8 md:h-10 invert" />
          </div>
        </div>
      </div>
    </section>
  );
}
