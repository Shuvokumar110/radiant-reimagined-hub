import { Link } from "react-router-dom";
import { useState } from "react";

import galleryTeam1 from "@/assets/gallery/team-1.png";
import galleryTeam2 from "@/assets/gallery/team-2.png";
import galleryTeam3 from "@/assets/gallery/team-3.png";
import galleryTeam4 from "@/assets/gallery/team-4.png";
import { useFadeIn, useStaggerFadeIn, useLayeredParallax } from "@/hooks/useGSAPAnimations";

const categories = [
  "All Products", "Team Uniforms", "Jerseys", "Tracksuits", "T-Shirts", 
  "Hoodies", "Jackets", "Shorts", "Caps", "Accessories"
];

const programs = [
  { name: "High School", subtitle: "Programs", image: galleryTeam1, href: "/programs/high-school", speed: -0.3 },
  { name: "Club & Travel", subtitle: "Teams", image: galleryTeam2, href: "/programs/club-travel", speed: 0.2 },
  { name: "Collegiate", subtitle: "Athletics", image: galleryTeam3, href: "/programs/collegiate", speed: -0.2 },
  { name: "Leagues", subtitle: "& Academies", image: galleryTeam4, href: "/programs/leagues-academies", speed: 0.3 },
];

export function ElevateSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const headerRef = useFadeIn(0);
  const pillsRef = useStaggerFadeIn(0.05);
  const cardsRef = useLayeredParallax();

  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center overflow-hidden relative">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Explore Collections
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Elevate Your Game.</span>
            <br />
            <span className="text-muted-foreground">Stand Out.</span>
          </h2>
        </div>

        {/* Category Pills */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid with Layered Parallax */}
        <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {programs.map((program, index) => (
            <div 
              key={program.name} 
              data-parallax-speed={program.speed}
              className="will-change-transform"
            >
              <Link to={program.href}>
                <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                  {/* Image */}
                  <img
                    src={program.image}
                    alt={program.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
                        {program.name}
                      </h3>
                      <p className="text-white/70 text-sm">{program.subtitle}</p>
                    </div>
                    
                    {/* Arrow on hover */}
                    <div className="mt-4 flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="text-sm font-medium">Explore</span>
                      <span>→</span>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
