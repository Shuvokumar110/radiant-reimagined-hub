import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Award, Globe, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const slides = [
  {
    image: heroSlide1,
    title: "Play Bold.",
    subtitle: "Look Bold.",
  },
  {
    image: heroSlide2,
    title: "Win Together.",
    subtitle: "Stand Out.",
  },
  {
    image: heroSlide3,
    title: "Own The Game.",
    subtitle: "Own The Style.",
  },
];

const trustBadges = [
  {
    icon: Award,
    title: "Pro-Grade Quality",
    description: "Premium materials for peak performance",
  },
  {
    icon: Globe,
    title: "Worldwide Delivery",
    description: "Fast shipping to teams everywhere",
  },
  {
    icon: Sparkles,
    title: "Effortless Process",
    description: "Simple ordering from design to delivery",
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
    <section className="relative w-full overflow-hidden">
      {/* Main Hero */}
      <div className="relative h-[85vh] bg-muted">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slides[current].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-none mb-2">
                  {slides[current].title}
                </h1>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white/90 leading-none mb-8">
                  {slides[current].subtitle}
                </h2>

                <MagneticButton className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-10 py-4 text-sm font-semibold tracking-wide uppercase transition-all rounded-md">
                  <Link to="/shop">Shop Collection</Link>
                </MagneticButton>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <button 
            onClick={prev} 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={next} 
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-background py-12 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-[140px] left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors z-20"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
