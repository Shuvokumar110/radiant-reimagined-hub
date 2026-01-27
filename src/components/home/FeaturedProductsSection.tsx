import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

const products = [
  {
    id: 1,
    name: "Elite Pro Jersey",
    category: "Training Wear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=800",
  },
  {
    id: 2,
    name: "Championship Shorts",
    category: "Match Day",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800",
  },
  {
    id: 3,
    name: "Kangaroo Leather Boots",
    category: "Footwear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=800",
  },
  {
    id: 4,
    name: "Team Training Kit",
    category: "Training Wear",
    price: "Contact for Pricing",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800",
  },
];

export function FeaturedProductsSection() {
  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 noise-overlay" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <FadeInUp>
              <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-4 block">
                Featured Collection
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-headline">Premium Selection</h2>
            </FadeInUp>
          </div>
          <FadeInUp delay={0.2}>
            <Link
              to="/shop"
              className="mt-6 md:mt-0 text-sm font-medium tracking-widest uppercase text-background/70 hover:text-background transition-colors flex items-center gap-2 group"
            >
              View All Products
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </FadeInUp>
        </div>

        {/* Products Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-lg mb-6 bg-background">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay Actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white text-foreground rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ShoppingBag className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div>
                  <span className="text-xs text-background/60 uppercase tracking-wider">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium mt-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-background/70">{product.price}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
