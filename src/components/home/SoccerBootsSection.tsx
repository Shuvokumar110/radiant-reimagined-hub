import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Sparkles, Star, Zap, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import heroBoots from "@/assets/hero-boots.png";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const features = [
  { label: "Italian Craftsmanship", icon: Star, detail: "Handmade in Italy" },
  { label: "Kangaroo Leather", icon: Sparkles, detail: "Premium K-Leather" },
  { label: "Custom Colors", icon: Zap, detail: "Unlimited Options" },
];

const bootImages = [
  { src: heroSlide1, label: "Pro Blue", color: "#3B82F6" },
  { src: heroSlide2, label: "Classic White", color: "#F8FAFC" },
  { src: heroSlide3, label: "Elite Black", color: "#1F2937" },
];

// Floating particle component
const FloatingParticle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-foreground/10"
    style={{ width: size, height: size, left }}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{ 
      y: "-100vh", 
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export function SoccerBootsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % bootImages.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + bootImages.length) % bootImages.length);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen py-20 lg:py-0 bg-background text-foreground flex flex-col lg:flex-row items-center overflow-hidden relative"
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 2}
            size={Math.random() * 8 + 4}
            left={`${Math.random() * 100}%`}
            duration={Math.random() * 10 + 15}
          />
        ))}
      </div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* Left Side - Content */}
      <motion.div 
        style={{ opacity }}
        className="w-full lg:w-1/2 px-8 md:px-16 lg:px-20 py-16 lg:py-0 relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-full mb-8"
        >
          <motion.div 
            className="w-2 h-2 bg-foreground rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium tracking-wider uppercase">Premium Collection</span>
        </motion.div>

        {/* Main Heading with Staggered Animation */}
        <div className="overflow-hidden mb-6">
          <motion.h2 
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1]"
          >
            Special Order
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h2 
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground/30"
          >
            Soccer Boots
          </motion.h2>
        </div>

        {/* Animated Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-24 h-1 bg-foreground origin-left mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-md mb-12 leading-relaxed"
        >
          Premium Italian-made boots crafted for champions. Experience the perfect blend of 
          tradition and innovation with our custom-designed soccer footwear.
        </motion.p>

        {/* Feature Cards */}
        <div className="space-y-4 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              className="group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-foreground/5"
            >
              {/* Icon Container */}
              <motion.div 
                className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center"
                animate={{ 
                  scale: hoveredFeature === index ? 1.1 : 1,
                  backgroundColor: hoveredFeature === index ? "hsl(var(--foreground) / 0.1)" : "hsl(var(--foreground) / 0.05)"
                }}
              >
                <feature.icon className="h-5 w-5" />
              </motion.div>
              
              {/* Text */}
              <div className="flex-1">
                <span className="font-semibold">{feature.label}</span>
                <motion.p 
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: hoveredFeature === index ? 1 : 0,
                    height: hoveredFeature === index ? "auto" : 0
                  }}
                >
                  {feature.detail}
                </motion.p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: hoveredFeature === index ? 5 : 0, opacity: hoveredFeature === index ? 1 : 0.3 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>

              {/* Hover Line */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-foreground rounded-full"
                initial={{ height: 0 }}
                animate={{ height: hoveredFeature === index ? "60%" : 0 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/shop?category=boots"
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-all rounded-full"
          >
            Explore Collection
            <motion.span
              className="inline-flex items-center justify-center w-8 h-8 bg-background/20 rounded-full"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side - Product Showcase */}
      <motion.div 
        style={{ y, scale }}
        className="w-full lg:w-1/2 relative flex items-center justify-center py-16 lg:py-0 min-h-[500px] lg:min-h-screen"
      >
        {/* Circular Background Glow */}
        <motion.div
          className="absolute w-[80%] aspect-square rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(var(--foreground) / 0.05) 0%, transparent 70%)`
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating Decorative Ring */}
        <motion.div
          className="absolute w-[70%] aspect-square rounded-full border border-foreground/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[85%] aspect-square rounded-full border border-dashed border-foreground/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Main Boot Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[80%] max-w-lg"
          >
            <img
              src={bootImages[activeImage].src}
              alt={bootImages[activeImage].label}
              className="w-full drop-shadow-2xl"
            />
            
            {/* Floating Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background border border-border px-6 py-3 rounded-full shadow-lg"
            >
              <span className="font-semibold">{bootImages[activeImage].label}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute bottom-8 lg:bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevImage}
            className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {bootImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveImage(index)}
                className="w-2 h-2 rounded-full bg-foreground/30 transition-all"
                animate={{ 
                  scale: activeImage === index ? 1.5 : 1,
                  backgroundColor: activeImage === index ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.3)"
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextImage}
            className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Color Accent Dot */}
        <motion.div
          className="absolute top-8 right-8 w-4 h-4 rounded-full"
          style={{ backgroundColor: bootImages[activeImage].color }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
