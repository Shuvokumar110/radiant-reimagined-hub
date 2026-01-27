import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, AnimatedText, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Shield, Globe, Zap, Shirt, Trophy, Users } from "lucide-react";

interface ProgramPageProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  highlights: { icon: ReactNode; title: string; description: string }[];
  outfitSolutions: { name: string; image: string }[];
  benefits: { title: string; description: string }[];
}

export function ProgramPageTemplate({
  title,
  subtitle,
  description,
  heroImage,
  highlights,
  outfitSolutions,
  benefits,
}: ProgramPageProps) {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-foreground text-background overflow-hidden pt-24 md:pt-32">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 pt-32 pb-16 md:pb-20">
          <div className="max-w-2xl">
            <FadeInUp>
              <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-4 block">
                {subtitle}
              </span>
            </FadeInUp>
            <AnimatedText
              text={title}
              className="text-display mb-6"
              delay={0.2}
            />
            <FadeInUp delay={0.4}>
              <p className="text-lg text-background/80 leading-relaxed mb-8">
                {description}
              </p>
            </FadeInUp>
            <FadeInUp delay={0.5}>
              <MagneticButton className="bg-background text-foreground px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-background/90 transition-colors">
                <Link to="/contact">Get Started</Link>
              </MagneticButton>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 md:mb-16">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Why Choose Us
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-foreground">Key Highlights.</span>
                <br />
                <span className="text-muted-foreground">What We Offer.</span>
              </h2>
            </FadeInUp>
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {highlights.map((highlight, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-8 bg-muted rounded-lg text-center hover:shadow-elegant transition-all duration-500"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-6 bg-foreground text-background rounded-full flex items-center justify-center"
                  >
                    {highlight.icon}
                  </motion.div>
                  <h3 className="font-serif text-xl font-semibold mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5-Step Process */}
      <ProcessSection />

      {/* Complete Outfit Solutions */}
      <section className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 md:mb-16">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  Complete Solutions
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-foreground">Everything.</span>
                <br />
                <span className="text-muted-foreground">Your Team Needs.</span>
              </h2>
            </FadeInUp>
          </div>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {outfitSolutions.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-serif font-medium">{item.name}</h3>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 lg:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-10 md:mb-16">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                  The TiDi Difference
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-background">Why Teams.</span>
                <br />
                <span className="text-background/50">Choose Us.</span>
              </h2>
            </FadeInUp>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <div className="border-l-2 border-background/30 pl-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-background/70">{benefit.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <StaggerContainer className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { icon: <Shield className="h-8 w-8" />, title: "Pro-Grade Quality" },
              { icon: <Globe className="h-8 w-8" />, title: "Worldwide Delivery" },
              { icon: <Zap className="h-8 w-8" />, title: "Effortless Process" },
            ].map((badge, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center">
                    {badge.icon}
                  </div>
                  <span className="font-serif font-medium">{badge.title}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <h2 className="text-headline mb-6">Ready to Get Started?</h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our team for custom pricing and exclusive offers for your program.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <MagneticButton className="bg-foreground text-background px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground/90 transition-colors">
              <Link to="/contact">Request Pricing</Link>
            </MagneticButton>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
