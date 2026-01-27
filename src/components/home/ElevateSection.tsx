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
    image: "https://images.unsplash.com/photo-1461896836934- voices-8bf1d5b4a?q=80&w=600",
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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Elevate Your Game with TiDi Apparel!
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={program.href}>
                <div className="relative group overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white text-sm font-medium">{program.name}</h3>
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
