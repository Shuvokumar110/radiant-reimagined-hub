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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
            Special Order Soccer
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Premium Italian-made soccer boots crafted from kangaroo leather with custom color options for your team.
          </p>
        </motion.div>

        {/* Main Boots Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <img
            src={heroBoots}
            alt="TiDi Soccer Boots Collection"
            className="w-full max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Action Shots Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {bootImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>

        {/* Features Bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <feature.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/shop?category=boots"
            className="inline-block bg-foreground text-background px-6 py-2.5 text-xs font-medium tracking-wide uppercase hover:bg-foreground/90 transition-colors rounded"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
