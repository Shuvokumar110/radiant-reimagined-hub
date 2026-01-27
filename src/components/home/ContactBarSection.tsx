import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import tidiLogo from "@/assets/tidi-logo.webp";

export function ContactBarSection() {
  return (
    <section className="py-6 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 bg-foreground text-background rounded-lg px-6 py-4"
        >
          <div className="flex items-center gap-4">
            <img src={tidiLogo} alt="TiDi" className="h-8 invert" />
            <div>
              <h3 className="font-medium text-sm">We Are Open for Your Questions!</h3>
              <p className="text-xs text-background/70">Ready to help you get started</p>
            </div>
          </div>
          
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-background text-foreground px-5 py-2 rounded text-xs font-medium hover:bg-background/90 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
