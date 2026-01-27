import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Users } from "lucide-react";
import { useRef } from "react";

import heroTeam from "@/assets/hero-team.png";

const features = [
  { icon: CheckCircle, title: "Pro-Grade Quality", value: "100%" },
  { icon: Package, title: "Customization", value: "Full" },
  { icon: Truck, title: "Delivery", value: "Global" },
  { icon: Users, title: "Teams Served", value: "500+" },
];

export function TeamNeedsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={containerRef} className="min-h-screen py-20 bg-muted flex flex-col justify-center overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content with parallax */}
          <motion.div style={{ y: contentY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Complete Solutions
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              <span className="text-foreground">All You Need.</span>
              <br />
              <span className="text-muted-foreground">One Place.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-10"
            >
              From jerseys to tracksuits, soccer boots to accessories - complete team 
              outfitting with your colors, logos, and player names.
            </motion.p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="bg-background p-5 rounded-xl border border-border group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center"
                    >
                      <feature.icon className="h-5 w-5" />
                    </motion.div>
                    <span className="text-xl font-bold text-foreground">{feature.value}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-all rounded group"
              >
                Get Team Quote
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - Image with parallax and decoration */}
          <motion.div 
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <img
                src={heroTeam}
                alt="Multi-sport team apparel"
                className="w-full rounded-2xl shadow-2xl"
              />
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 -left-4 bg-foreground text-background px-6 py-3 rounded-xl shadow-xl"
              >
                <span className="text-2xl font-bold">7+</span>
                <p className="text-xs text-background/70">Sports Covered</p>
              </motion.div>
            </motion.div>

            {/* Background decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -inset-4 bg-gradient-to-br from-foreground/5 to-transparent rounded-3xl -z-10"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-24 h-24 border border-foreground/10 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
