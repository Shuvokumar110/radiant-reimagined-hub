import { motion } from "framer-motion";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { useParallax } from "@/hooks/useScrollAnimation";

export function BrandStorySection() {
  const { ref, offset } = useParallax(0.3);

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <FadeInUp>
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
                Our Story
              </span>
            </FadeInUp>

            <AnimatedText
              text="Where Passion Meets Precision"
              className="text-headline mb-8"
              delay={0.2}
            />

            <FadeInUp delay={0.4}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At TiDi Apparel, we believe that every athlete deserves to feel
                exceptional. Our journey began with a simple vision: to create
                premium athletic wear that matches the dedication and passion of
                the teams who wear it.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From high school fields to collegiate arenas, we craft each piece
                with meticulous attention to detail, using only the finest
                materials to ensure maximum performance and lasting comfort.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.6}>
              <div className="flex gap-12">
                <div>
                  <motion.span
                    className="counter-number text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    500+
                  </motion.span>
                  <p className="text-sm text-muted-foreground mt-2">Teams Served</p>
                </div>
                <div>
                  <motion.span
                    className="counter-number text-foreground"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    15+
                  </motion.span>
                  <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Right - Image with Parallax */}
          <div ref={ref} className="relative">
            <motion.div
              style={{ y: offset }}
              className="relative z-10"
            >
              <div className="img-zoom rounded-lg overflow-hidden shadow-luxury">
                <img
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1200"
                  alt="Team wearing TiDi apparel"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -left-8 w-64 h-64 border border-foreground/20 rounded-lg z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-foreground z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
