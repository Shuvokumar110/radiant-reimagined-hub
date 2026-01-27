import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Custom Pro Jersey",
    category: "Team Wear",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=400",
  },
  {
    id: 2,
    name: "Training Tracksuit",
    category: "Training",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=400",
  },
  {
    id: 3,
    name: "Team Polo Shirt",
    category: "Casual",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400",
  },
  {
    id: 4,
    name: "Performance Jersey",
    category: "Match Day",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400",
  },
];

export function BestSellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-muted flex flex-col justify-center overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header with animated line */}
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Best Sellers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-foreground">Top Picks.</span>
              <br />
              <span className="text-muted-foreground">Fan Favorites.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/shop" 
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-2 group"
            >
              View All
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="h-px bg-border mb-12 origin-left"
        />

        {/* Products Grid with staggered animation */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group"
            >
              <Link to={`/shop?product=${product.id}`}>
                {/* Image Container */}
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-background mb-4 aspect-[3/4]"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Overlay with actions */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[Heart, Eye, ShoppingBag].map((Icon, i) => (
                      <motion.button
                        key={i}
                        initial={{ scale: 0, y: 20 }}
                        animate={{
                          scale: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 20,
                        }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* Category Badge */}
                  <motion.div
                    className="absolute top-3 left-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: hoveredProduct === product.id ? 1 : 0,
                      x: hoveredProduct === product.id ? 0 : -10,
                    }}
                  >
                    <span className="px-3 py-1 bg-background/90 text-foreground text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                  animate={{
                    y: hoveredProduct === product.id ? -4 : 0,
                  }}
                >
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Contact for pricing
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom floating text */}
        <motion.div 
          style={{ x }}
          className="mt-16 overflow-hidden"
        >
          <div className="text-[100px] md:text-[150px] font-bold text-foreground/5 whitespace-nowrap">
            PREMIUM QUALITY • CUSTOM DESIGNS • TEAM APPAREL •
          </div>
        </motion.div>
      </div>
    </section>
  );
}
