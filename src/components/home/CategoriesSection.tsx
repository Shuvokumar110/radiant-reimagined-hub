import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

const categories = [
  {
    name: "Soccer Boots",
    description: "Italian-made premium footwear",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800",
    href: "/shop?category=boots",
  },
  {
    name: "Training Wear",
    description: "Performance-focused gear",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800",
    href: "/shop?category=training",
  },
  {
    name: "Match Day Kits",
    description: "Custom team uniforms",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800",
    href: "/shop?category=kits",
  },
  {
    name: "Accessories",
    description: "Complete your look",
    image: "https://images.unsplash.com/photo-1585149043856-1c8de32fdf08?q=80&w=800",
    href: "/shop?category=accessories",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeInUp>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Browse By Category
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-headline">Shop Collections</h2>
          </FadeInUp>
        </div>

        {/* Categories Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <StaggerItem key={category.name}>
              <Link to={category.href}>
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  className="relative group overflow-hidden rounded-lg h-80"
                >
                  {/* Background Image */}
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-2xl font-serif font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/70 text-sm">{category.description}</p>

                    {/* Hover Arrow */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="mt-4 text-white text-sm flex items-center gap-2"
                    >
                      <span>Explore</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Border Effect on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 border-2 border-white/30 rounded-lg pointer-events-none"
                  />
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
