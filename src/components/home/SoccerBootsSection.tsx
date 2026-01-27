import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import heroBoots from "@/assets/hero-boots.png";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const bootVariants = [
  { src: heroSlide1, name: "Azure Pro", material: "K-Leather" },
  { src: heroSlide2, name: "Ghost White", material: "Calf Leather" },
  { src: heroSlide3, name: "Obsidian", material: "Kangaroo" },
];

export function SoccerBootsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-32 md:py-40 bg-secondary overflow-hidden"
    >
      {/* Minimal Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-12 h-px bg-foreground/30" />
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Premium Footwear
          </span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Special Order
              <br />
              <span className="text-muted-foreground">Soccer</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              Italian-crafted boots built for champions. Hand-selected materials, 
              custom colorways, and precision engineering.
            </motion.p>

            {/* Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
            >
              {["Italian Made", "Custom Colors", "Premium Leather"].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-foreground/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to="/shop?category=boots"
                className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase"
              >
                <span className="relative">
                  Explore Collection
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-200" />
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right - Boot Display */}
          <div className="relative">
            {/* Main Boot Image */}
            <motion.div
              style={{ y, opacity }}
              className="relative z-10"
            >
              <motion.img
                src={heroBoots}
                alt="TiDi Premium Soccer Boots"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>

            {/* Decorative Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-foreground/5 -z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full border border-foreground/5 -z-0" />
          </div>
        </div>

        {/* Boot Variants - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-foreground/10"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            {bootVariants.map((boot, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group relative p-4 md:p-6 rounded-2xl transition-all duration-500 ${
                  activeIndex === index 
                    ? "bg-background shadow-elegant" 
                    : "hover:bg-background/50"
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-xl">
                  <img
                    src={boot.src}
                    alt={boot.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm md:text-base">{boot.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{boot.material}</p>
                </div>
                
                {/* Active Indicator */}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
