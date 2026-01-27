import { motion } from "framer-motion";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Link } from "react-router-dom";

export function SoccerBootsSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 overflow-hidden rounded-lg shadow-luxury"
              >
                <img
                  src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=1200"
                  alt="Premium Italian Soccer Boots"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-6 right-6 bg-foreground text-background px-4 py-2 rounded-full"
                >
                  <span className="text-xs font-medium tracking-widest uppercase">
                    Made in Italy
                  </span>
                </motion.div>
              </motion.div>

              {/* Decorative Frame */}
              <div className="absolute inset-0 border border-foreground/20 rounded-lg transform translate-x-4 translate-y-4 -z-10" />
            </div>

            {/* Material Tags */}
            <div className="flex flex-wrap gap-3 mt-6">
              {["Kangaroo Leather", "Hand-Stitched", "Custom Fit"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-4 py-2 bg-muted text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right - Content */}
          <div>
            <FadeInUp>
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
                Special Order
              </span>
            </FadeInUp>

            <AnimatedText
              text="Italian-Made Soccer Boots"
              className="text-headline mb-6"
              delay={0.2}
            />

            <FadeInUp delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Experience the pinnacle of soccer footwear with our special order
                Italian-made boots. Crafted from premium kangaroo leather, each
                pair is hand-stitched by master artisans to deliver unparalleled
                touch, comfort, and durability.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <ul className="space-y-4 mb-8">
                {[
                  "Premium kangaroo leather upper",
                  "Custom color options for your team",
                  "Personalized embroidery available",
                  "Anatomical fit technology",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-foreground rounded-full" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <MagneticButton className="bg-foreground text-background px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors">
                <Link to="/shop?category=boots">View Collection</Link>
              </MagneticButton>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
