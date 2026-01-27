import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link } from "react-router-dom";
import tidiLogo from "@/assets/tidi-logo.webp";

export function HeroSection() {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Background Image with Subtle Zoom */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2036')`,
          }}
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute left-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
          className="absolute right-[10%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
          className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent origin-left"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        {/* Logo - Static & Elegant */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <img
            src={tidiLogo}
            alt="TiDi Apparel"
            className="h-20 md:h-28 w-auto invert opacity-90"
          />
        </motion.div>

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-px w-12 bg-white/40" />
          <span className="text-xs tracking-[0.3em] uppercase text-white/60 font-light">
            Premium Athletic Wear
          </span>
          <span className="h-px w-12 bg-white/40" />
        </motion.div>

        {/* Main Headline */}
        <AnimatedText
          text="Built for Champions"
          className="text-display mb-8"
          delay={0.6}
        />

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-base md:text-lg text-white/70 max-w-xl mb-12 font-light tracking-wide leading-relaxed"
        >
          Premium athletic apparel and footwear crafted for teams who demand
          excellence on and off the field.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton className="bg-white text-black px-12 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300">
            <Link to="/shop">Explore Collection</Link>
          </MagneticButton>
          <MagneticButton className="border border-white/30 text-white px-12 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 hover:border-white/50 transition-all duration-300">
            <Link to="/contact">Request Quote</Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 hover:text-white flex flex-col items-center gap-3 transition-colors duration-300"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
