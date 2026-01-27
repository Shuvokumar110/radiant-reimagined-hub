import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Users } from "lucide-react";

import heroTeam from "@/assets/hero-team.png";

const features = [
  {
    icon: CheckCircle,
    title: "Pro-Grade Quality",
    description: "Premium materials built for performance",
  },
  {
    icon: Package,
    title: "Customize as Desired",
    description: "Full customization options available",
  },
  {
    icon: Truck,
    title: "Fast Worldwide Delivery",
    description: "Quick shipping to your location",
  },
  {
    icon: Users,
    title: "Trusted by Teams",
    description: "500+ teams served worldwide",
  },
];

export function TeamNeedsSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
              Everything Your Team Needs
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              From jerseys to tracksuits, soccer boots to accessories - TiDi Apparel provides 
              complete team outfitting solutions. Customize every piece with your team colors, 
              logos, and player names.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <feature.icon className="h-4 w-4 text-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-medium text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-block bg-foreground text-background px-6 py-2.5 text-xs font-medium tracking-wide uppercase hover:bg-foreground/90 transition-colors rounded"
            >
              Get Team Quote
            </Link>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={heroTeam}
              alt="Multi-sport team apparel"
              className="w-full rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
