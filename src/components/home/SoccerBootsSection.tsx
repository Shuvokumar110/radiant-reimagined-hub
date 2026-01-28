import { Link } from "react-router-dom";
import { useState } from "react";
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
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-background text-foreground overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="w-full px-4 md:px-16 lg:px-24 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-full mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Premium Italian-Made
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Special Order.</span>
            <br />
            <span className="text-muted-foreground">Built to Last.</span>
          </h2>
        </div>

        {/* Main Boots Display */}
        <div className="mb-8 md:mb-12">
          <img
            src={heroBoots}
            alt="TiDi Soccer Boots Collection"
            className="w-full max-w-md md:max-w-2xl lg:max-w-4xl mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Boot Selector - Horizontal Scroll on Mobile */}
        <div className="mb-8 md:mb-12">
          {/* Mobile: Horizontal Scroll */}
          <div className="flex md:hidden gap-3 overflow-x-auto pb-4 px-2 -mx-2 scrollbar-hide snap-x snap-mandatory">
            {bootImages.map((img, index) => (
              <div
                key={index}
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
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-white transition-transform ${
                    activeImage === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {bootImages.map((img, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveImage(index)}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                  activeImage === index ? "ring-2 ring-foreground" : ""
                }`}
              >
                <div className="aspect-square group">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-sm font-medium text-white">{img.label}</span>
                  </div>
                </div>
                
                {/* Active Indicator */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-white transition-transform ${
                    activeImage === index ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-10">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-full border border-border"
            >
              <feature.icon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/shop?category=Soccer+Boots"
            className="inline-block bg-foreground text-background px-6 py-2.5 md:px-8 md:py-3 text-xs md:text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-all rounded"
          >
            <span className="flex items-center gap-2">
              Explore Collection
              <span>→</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}