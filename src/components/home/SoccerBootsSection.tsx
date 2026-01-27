import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Globe, Zap, Package } from "lucide-react";

import heroBoots from "@/assets/hero-boots.png";
import heroSlide1 from "@/assets/hero-slide-1.png";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";

const features = [
  { icon: Award, label: "Pro-Grade Quality" },
  { icon: Globe, label: "Made in Italy" },
  { icon: Zap, label: "Custom Colors" },
  { icon: Package, label: "Team Orders" },
];

const bootImages = [
  { src: heroSlide1, alt: "Blue Soccer Boot" },
  { src: heroSlide2, alt: "White Soccer Boot" },
  { src: heroSlide3, alt: "Black Soccer Boot" },
];

export function SoccerBootsSection() {
  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Special Order Soccer
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Premium Italian-made soccer boots crafted from kangaroo leather with custom color options for your team.
          </p>
        </motion.div>

        {/* Main Boots Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <img
            src={heroBoots}
            alt="TiDi Soccer Boots Collection"
            className="w-full max-w-5xl mx-auto"
          />
        </motion.div>

        {/* Action Shots Grid */}
        <div className="grid grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {bootImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl aspect-square group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <feature.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/shop?category=boots"
            className="inline-block bg-foreground text-background px-8 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-colors rounded"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
