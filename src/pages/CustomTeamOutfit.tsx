import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Award, Globe, Zap, Shirt, Users, CheckCircle } from "lucide-react";

import heroImage from "@/assets/team-outfit-hero.png";
import hockeyImage from "@/assets/team-outfit-hockey.png";
import cricketImage from "@/assets/team-outfit-cricket.png";

const sports = [
  "Soccer",
  "Basketball",
  "American Football",
  "Baseball/Softball",
  "Track and Field",
  "Cricket",
  "Business",
];

const processSteps = [
  { number: 1, title: "Plan", description: "Share rosters, logos, colors, and sizes." },
  { number: 2, title: "Design", description: "Receive sport-specific mockups for approval." },
  { number: 3, title: "Approve", description: "Confirm details and finalize." },
  { number: 4, title: "Produce", description: "Pro manufacturing + strict quality checks." },
  { number: 5, title: "Deliver", description: "Packed by team or player, shipped anywhere." },
];

const outfitSolutions = [
  { title: "Jerseys & Shorts", description: "Durable, breathable, and made for competition." },
  { title: "Tracksuits & Hoodies", description: "Perfect for warm-ups, travel, and team events." },
  { title: "Polo Shirts & Coach Apparel", description: "Keep staff professional and coordinated." },
  { title: "Fanwear & Accessories", description: "Extend your brand to parents, supporters, and fans." },
];

const whyChoose = [
  { title: "Consistent Branding", description: "Keep players, coaches, and staff in one unified look." },
  { title: "Guaranteed Quality", description: "Pro-grade fabrics and stitching built for performance." },
  { title: "Fast Delivery", description: "A streamlined process from design approval to final shipping." },
  { title: "Bulk Savings", description: "Exclusive volume discounts for TiDi Nation members." },
];

const trustBadges = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "Pro-Grade Quality",
    description: "Durable fabrics and precision stitching that perform season after season.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Worldwide Delivery",
    description: "No matter where your team competes, TiDi Apparel ships worldwide.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Effortless Process",
    description: "From mockups to delivery, our 5-step system keeps things simple and fast.",
  },
];

function ProcessStepCard({ step, index }: { step: typeof processSteps[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start gap-4 md:gap-6"
    >
      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-background text-foreground flex items-center justify-center text-xl md:text-2xl font-bold border-2 border-background/20">
        {step.number}
      </div>
      <div className="flex-1 pt-2 md:pt-4">
        <h3 className="text-lg md:text-xl font-semibold mb-1">{step.title}</h3>
        <p className="text-background/70 text-sm md:text-base">{step.description}</p>
      </div>
      {index < processSteps.length - 1 && (
        <div className="absolute left-6 md:left-8 top-14 md:top-18 w-0.5 h-12 md:h-16 bg-background/30" />
      )}
    </motion.div>
  );
}

export default function CustomTeamOutfit() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-foreground text-background overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-transparent z-10" />
          <img
            src={heroImage}
            alt="Team Outfits"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 pt-32 pb-20">
          <div className="max-w-3xl">
            <FadeInUp>
              <span className="inline-block px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-sm font-medium mb-6 border border-background/20">
                Custom Outfit
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                Team Outfits by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-background to-background/70">
                  TiDi Apparel
                </span>
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg md:text-xl text-background/80 mb-8 leading-relaxed max-w-2xl">
                Outfit your entire program with professional-grade uniforms, tracksuits, and gear. At TiDi Apparel, we specialize in custom team outfits designed for schools, clubs, leagues, and academies.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 px-8 py-6 text-lg"
              >
                <Link to="/contact">Customize Now</Link>
              </Button>
            </FadeInUp>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-background/50 rounded-full flex justify-center"
          >
            <motion.div className="w-1.5 h-3 bg-background/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Sports Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-foreground/10 text-sm font-medium mb-4">
                Our Sports
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Every Sport. <span className="text-muted-foreground">Every Team.</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="flex flex-wrap justify-center gap-4 md:gap-6">
            {sports.map((sport) => (
              <StaggerItem key={sport}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="px-6 py-4 bg-foreground text-background rounded-full flex items-center cursor-pointer shadow-elegant hover:shadow-luxury transition-shadow"
                >
                  <span className="font-medium">{sport}</span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeInUp>
                <span className="inline-block px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-sm font-medium mb-4 border border-background/20">
                  Our Process
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12">
                  Simple. <span className="text-background/60">Streamlined.</span>
                </h2>
              </FadeInUp>

              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <ProcessStepCard key={step.number} step={step} index={index} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src={cricketImage}
                  alt="Cricket Player"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-foreground">
                  <img
                    src={hockeyImage}
                    alt="Hockey Player"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Complete Outfit Solutions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-foreground/10 text-sm font-medium mb-4">
                Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Complete Outfit <span className="text-muted-foreground">Solutions</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outfitSolutions.map((solution, index) => (
              <StaggerItem key={solution.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group p-8 bg-foreground text-background rounded-2xl h-full shadow-elegant hover:shadow-luxury transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-background/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Shirt className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-background/70">{solution.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose TiDi */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeInUp>
                <span className="inline-block px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-sm font-medium mb-4 border border-background/20">
                  Why TiDi
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
                  Why Choose TiDi{" "}
                  <span className="text-background/60">Team Outfits?</span>
                </h2>
              </FadeInUp>

              <StaggerContainer className="space-y-6">
                {whyChoose.map((item) => (
                  <StaggerItem key={item.title}>
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-background/5 hover:bg-background/10 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-background/70">{item.description}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="Team Athletes"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-background text-foreground hover:bg-background/90"
                >
                  <Link to="/contact">Request Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {trustBadges.map((badge) => (
              <StaggerItem key={badge.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="text-center p-8 rounded-2xl bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-foreground text-background flex items-center justify-center mb-6">
                    {badge.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{badge.title}</h3>
                  <p className="text-muted-foreground">{badge.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Ready to Outfit Your Team?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-background/70 mb-8 max-w-2xl mx-auto">
              Get started today with a free consultation and custom quote for your team.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-12 py-6 text-lg"
            >
              <Link to="/contact">Request Pricing</Link>
            </Button>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
