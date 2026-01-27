import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Globe, Sparkles } from "lucide-react";
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
    description: "Premium materials built for performance",
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full">
      {/* Main Hero - Full Width */}
      <div className="relative h-screen min-h-[600px]">
        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slides[current].image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content - Full Width */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full px-8 md:px-16 lg:px-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-2">
                  {slides[current].title}
                </h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white/90 leading-tight mb-8">
                  {slides[current].subtitle}
                </h2>

                <Link 
                  to="/shop"
                  className="inline-block bg-destructive hover:bg-destructive/90 text-white px-10 py-4 text-sm font-semibold tracking-wide uppercase transition-all rounded"
                >
                  Shop Collection
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button 
            onClick={prev} 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/30 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={next} 
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/30 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Trust Badges Section - Full Width */}
      <div className="bg-background py-10 border-b border-border">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-5 w-5 text-foreground" />
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
    </section>
  );
}
