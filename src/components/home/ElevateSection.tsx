import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

import galleryTeam1 from "@/assets/gallery/team-1.png";
import galleryTeam2 from "@/assets/gallery/team-2.png";
import galleryTeam3 from "@/assets/gallery/team-3.png";
import galleryTeam4 from "@/assets/gallery/team-4.png";
import { PARALLAX_ENABLED } from "@/lib/motionConfig";

const categories = [
  "All Products", "Team Uniforms", "Jerseys", "Tracksuits", "T-Shirts", 
  "Hoodies", "Jackets", "Shorts", "Caps", "Accessories"
];

const programs = [
  {
    name: "High School",
    subtitle: "Programs",
    image: galleryTeam1,
    href: "/programs/high-school",
  },
  {
    name: "Club & Travel",
    subtitle: "Teams",
    image: galleryTeam2,
    href: "/programs/club-travel",
  },
  {
    name: "Collegiate",
    subtitle: "Athletics",
    image: galleryTeam3,
    href: "/programs/collegiate",
  },
  {
    name: "Leagues",
    subtitle: "& Academies",
    image: galleryTeam4,
    href: "/programs/leagues-academies",
  },
];

export function ElevateSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-background flex flex-col justify-center overflow-hidden relative">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header with reveal animation */}
        <motion.div
          style={{ opacity: PARALLAX_ENABLED ? opacity : 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Explore Collections
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            <span className="text-foreground">Elevate Your Game.</span>
            <br />
            <span className="text-muted-foreground">Stand Out.</span>
          </motion.h2>
        </motion.div>

        {/* Animated Category Pills */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Programs Grid with Parallax Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{ y: PARALLAX_ENABLED && index % 2 === 0 ? y : 0 }}
            >
              <Link to={program.href}>
                <motion.div 
                  className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Image with zoom */}
                  <motion.img
                    src={program.image}
                    alt={program.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ 
                      scale: hoveredIndex === index ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                    animate={{
                      opacity: hoveredIndex === index ? 0.9 : 0.7,
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <motion.div
                      animate={{
                        y: hoveredIndex === index ? -10 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                        {program.name}
                      </h3>
                      <p className="text-white/70 text-sm">{program.subtitle}</p>
                    </motion.div>
                    
                    {/* Animated Arrow */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -10,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-medium">Explore</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50"
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      scale: hoveredIndex === index ? 1 : 0.8,
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

