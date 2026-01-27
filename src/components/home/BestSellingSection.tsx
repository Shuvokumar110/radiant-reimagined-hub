import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Custom Pro Soccer Jersey",
    description: "High-performance sublimated team jersey with moisture-wicking fabric",
    image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=400",
    colors: ["#ff6b35", "#1a1a2e", "#16213e"],
  },
  {
    id: 2,
    name: "Tracksuit Training Set",
    description: "Premium polyester tracksuit with team branding options",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=400",
    colors: ["#2d3436", "#0984e3", "#00b894"],
  },
  {
    id: 3,
    name: "Custom Team Polo",
    description: "Professional polo shirt perfect for coaches and staff",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400",
    colors: ["#fdcb6e", "#6c5ce7", "#e17055"],
  },
  {
    id: 4,
    name: "Performance Training Jersey",
    description: "Lightweight training jersey with sublimated design",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400",
    colors: ["#00cec9", "#fab1a0", "#81ecec"],
  },
];

export function BestSellingSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-2 block">
            Best Selling Products
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
            Popular Team Apparel
          </h2>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/shop?product=${product.id}`}>
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg bg-background mb-3 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 text-foreground" />
                  </button>
                </div>

                {/* Info */}
                <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Color Options */}
                <div className="flex gap-1">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
