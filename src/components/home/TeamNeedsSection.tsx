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
    <section className="min-h-screen py-20 bg-muted flex flex-col justify-center">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Everything Your Team Needs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              From jerseys to tracksuits, soccer boots to accessories - TiDi Apparel provides 
              complete team outfitting solutions. Customize every piece with your team colors, 
              logos, and player names.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-background p-4 rounded-xl"
                >
                  <feature.icon className="h-6 w-6 text-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/contact"
              className="inline-block bg-foreground text-background px-8 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-colors rounded"
            >
              Get Team Quote
            </Link>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={heroTeam}
              alt="Multi-sport team apparel"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
