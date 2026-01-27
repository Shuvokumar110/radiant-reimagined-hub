import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Sparkles, Star, Zap } from "lucide-react";

import heroBoots from "@/assets/hero-boots.png";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const features = [
  { label: "Italian Craftsmanship", icon: Star },
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

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-background text-foreground flex flex-col justify-center overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Decorative line with diamond */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-r from-transparent to-foreground/30"
            />
            <motion.div
              initial={{ scale: 0, rotate: 45 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-2 h-2 bg-foreground/40"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-gradient-to-l from-transparent to-foreground/30"
            />
          </div>

          {/* Small label */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            Exclusive Collection
          </motion.span>

          {/* Main Title with split animation */}
          <div className="overflow-hidden mb-4">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight"
            >
              Special Order
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h2 
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight italic"
            >
              Soccer
            </motion.h2>
          </div>

          {/* Subtitle with reveal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground max-w-md mx-auto text-sm md:text-base tracking-wide"
          >
            Premium Italian-made boots crafted for champions
          </motion.p>

          {/* Bottom decorative element */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-24 h-px bg-foreground/20 mx-auto mt-8"
          />
        </motion.div>

        {/* Main Boots Display with 3D Effect */}
        <motion.div
          style={{ rotateY, scale }}
          className="mb-12 perspective-1000"
        >
          <motion.img
            src={heroBoots}
            alt="TiDi Soccer Boots Collection"
            className="w-full max-w-4xl mx-auto drop-shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Interactive Boot Selector */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
          {bootImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onHoverStart={() => setActiveImage(index)}
              className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                activeImage === index ? "ring-2 ring-background" : ""
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
                className="absolute bottom-0 left-0 right-0 h-1 bg-background"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeImage === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Feature Pills */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-10"
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
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-background/20"
            >
              <feature.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{feature.label}</span>
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
            className="inline-block bg-background text-foreground px-8 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-background/90 transition-all rounded group"
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
