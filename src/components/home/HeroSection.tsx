import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2036",
    title: "Built for Champions",
    subtitle: "Premium team apparel",
  },
  {
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2036",
    title: "Play. Win. Repeat.",
    subtitle: "Performance gear that lasts",
  },
  {
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2036",
    title: "Your Game. Your Style.",
    subtitle: "Custom designs for every team",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slides[current].image}')` }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-4">
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light tracking-wide mb-10">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4"
        >
          <MagneticButton className="bg-white text-black px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-all">
            <Link to="/shop">Shop Now</Link>
          </MagneticButton>
          <MagneticButton className="border border-white/40 text-white px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
            <Link to="/contact">Get Quote</Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        <button onClick={prev} className="text-white/50 hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-white" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
        <button onClick={next} className="text-white/50 hover:text-white transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
