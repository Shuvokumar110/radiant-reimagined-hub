import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

import tidiLogo from "@/assets/tidi-logo.webp";

export const ContactBarSection = forwardRef<HTMLElement>(function ContactBarSection(_props, ref) {
  return (
    <section className="py-10 bg-background">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 bg-foreground text-background rounded-2xl px-8 py-6"
        >
          <div className="flex items-center gap-5">
            <img src={tidiLogo} alt="TiDi" className="h-10 invert" />
            <div>
              <h3 className="font-semibold text-lg">We Are Open for Your Questions!</h3>
              <p className="text-sm text-background/70">Ready to help you get started with your team apparel</p>
            </div>
          </div>
          
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
});
