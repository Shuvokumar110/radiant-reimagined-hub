import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function CTASection() {
  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated Circles */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-background/10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-background/10"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInUp>
            <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-6 block">
              Ready to Elevate Your Team?
            </span>
          </FadeInUp>

          <AnimatedText
            text="Let's Create Something Extraordinary Together"
            className="text-headline mb-8"
            delay={0.2}
          />

          <FadeInUp delay={0.4}>
            <p className="text-lg text-background/70 max-w-2xl mx-auto mb-10">
              Partner with TiDi Apparel for premium custom athletic wear that
              matches your team's dedication. Get a personalized quote today.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-background/60">
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
    </section>
  );
}
