import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Sparkles, Star, Zap } from "lucide-react";

import heroBoots from "@/assets/hero-boots.png";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const features = [
  { label: "Italian Craft", icon: Star },
  { label: "Kangaroo Leather", icon: Sparkles },
  { label: "Custom Colors", icon: Zap },
];

const bootImages = [
  { src: heroSlide1, label: "Pro Blue" },
  { src: heroSlide2, label: "Classic White" },
  { src: heroSlide3, label: "Elite Black" },
];

export function SoccerBootsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-background text-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="w-full px-4 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-full mb-4 md:mb-6"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Premium Italian-Made
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold"
          >
            <span className="text-foreground">Special Order.</span>
            <br />
            <span className="text-muted-foreground">Built to Last.</span>
          </motion.h2>
        </motion.div>

        {/* Main Boots Display */}
        <motion.div
          style={{ rotateY, scale }}
          className="mb-8 md:mb-12"
        >
          <motion.img
            src={heroBoots}
            alt="TiDi Soccer Boots Collection"
            className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Boot Selector - Horizontal Scroll on Mobile */}
        <div className="mb-8 md:mb-12">
          {/* Mobile: Horizontal Scroll */}
          <div className="flex md:hidden gap-3 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-hide snap-x snap-mandatory">
            {bootImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 w-28 snap-center overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                  activeImage === index ? "ring-2 ring-foreground" : ""
                }`}
              >
                <div className="aspect-square">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-xs font-medium text-white">{img.label}</span>
                  </div>
                </div>
                
                {/* Active Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeImage === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {bootImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                onHoverStart={() => setActiveImage(index)}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                  activeImage === index ? "ring-2 ring-foreground" : ""
                }`}
              >
                <motion.div
                  className="aspect-square"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div 
                    className="absolute bottom-3 left-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: activeImage === index ? 1 : 0.7, y: 0 }}
                  >
                    <span className="text-sm font-medium text-white">{img.label}</span>
                  </motion.div>
                </motion.div>
                
                {/* Active Indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeImage === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-full border border-border"
            >
              <feature.icon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to="/shop?category=boots"
            className="inline-block bg-foreground text-background px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-all rounded"
          >
            <span className="flex items-center gap-2">
              Explore Collection
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
