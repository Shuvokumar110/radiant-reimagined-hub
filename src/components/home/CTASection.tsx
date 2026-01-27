import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import victoryCelebration from "@/assets/victory-celebration.jpg";

export function CTASection() {
  return (
    <section className="py-0 bg-foreground text-background relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Image Side */}
        <div className="relative h-[400px] lg:h-auto overflow-hidden">
          <motion.img
            src={victoryCelebration}
            alt="Victory Celebration"
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-foreground lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground to-transparent lg:hidden" />
        </div>

        {/* Content Side */}
        <div className="relative z-10 flex items-center py-16 lg:py-24 px-8 md:px-16 lg:px-20">
          <div className="max-w-xl">
            <FadeInUp>
              <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-6 block">
                Ready to Elevate Your Team?
              </span>
            </FadeInUp>

            <AnimatedText
              text="Let's Create Something Extraordinary Together"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
              delay={0.2}
            />

            <FadeInUp delay={0.4}>
              <p className="text-lg text-background/70 mb-10">
                Partner with TiDi Apparel for premium custom athletic wear that
                matches your team's dedication. Get a personalized quote today.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton className="bg-background text-foreground px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-background/90 transition-colors">
                  <Link to="/contact">Request a Quote</Link>
                </MagneticButton>
                <MagneticButton className="border border-background/50 text-background px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-background/10 transition-colors">
                  <Link to="/shop">Browse Products</Link>
                </MagneticButton>
              </div>
            </FadeInUp>

            {/* Trust Indicators */}
            <FadeInUp delay={0.6}>
              <div className="flex flex-wrap gap-6 mt-12 text-sm text-background/60">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Fast Turnaround
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Premium Quality
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  Worldwide Shipping
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
