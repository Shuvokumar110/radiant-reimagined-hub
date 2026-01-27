import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  "All Products", "Team Uniforms", "Jerseys", "Tracksuits", "T-Shirts", 
  "Hoodies", "Jackets", "Shorts", "Caps", "Bags", "Accessories"
];

const programs = [
  {
    name: "High School Programs",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600",
    href: "/programs/high-school",
  },
  {
    name: "Club & Travel Teams",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600",
    href: "/programs/club-travel",
  },
  {
    name: "Collegiate Athletics",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600",
    href: "/programs/collegiate",
  },
  {
    name: "Leagues & Academies",
    image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=600",
    href: "/programs/leagues",
  },
];

export function ElevateSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Elevate Your Game with TiDi Apparel!
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid - Full Width */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={program.href}>
                <div className="relative group overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-lg font-semibold">{program.name}</h3>
                    <motion.span 
                      className="text-white/70 text-sm flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Explore →
                    </motion.span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
