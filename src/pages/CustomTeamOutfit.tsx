import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Award, Globe, Zap, Shirt, CheckCircle, ClipboardList, Palette, Factory, Truck } from "lucide-react";

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
  { number: "01", title: "Plan", description: "Share rosters, logos, colors, and sizes.", icon: ClipboardList },
  { number: "02", title: "Design", description: "Receive sport-specific mockups for approval.", icon: Palette },
  { number: "03", title: "Approve", description: "Confirm details and finalize.", icon: CheckCircle },
  { number: "04", title: "Produce", description: "Pro manufacturing + strict quality checks.", icon: Factory },
  { number: "05", title: "Deliver", description: "Packed by team or player, shipped anywhere.", icon: Truck },
];

const outfitSolutions = [
  { icon: Shirt, title: "Jerseys & Shorts", description: "Durable, breathable, and made for competition." },
  { icon: Shirt, title: "Tracksuits & Hoodies", description: "Perfect for warm-ups, travel, and team events." },
  { icon: Shirt, title: "Polo Shirts & Coach Apparel", description: "Keep staff professional and coordinated." },
  { icon: Shirt, title: "Fanwear & Accessories", description: "Extend your brand to parents, supporters, and fans." },
];

const whyChoose = [
  { title: "Consistent Branding", description: "Keep players, coaches, and staff in one unified look." },
  { title: "Guaranteed Quality", description: "Pro-grade fabrics and stitching built for performance." },
  { title: "Fast Delivery", description: "A streamlined process from design approval to final shipping." },
  { title: "Bulk Savings", description: "Exclusive volume discounts for TiDi Nation members." },
];

const trustBadges = [
  {
    icon: Award,
    title: "Pro-Grade Quality",
    description: "Durable fabrics and precision stitching that perform season after season.",
  },
  {
    icon: Globe,
    title: "Worldwide Delivery",
    description: "No matter where your team competes, TiDi Apparel ships worldwide.",
  },
  {
    icon: Zap,
    title: "Effortless Process",
    description: "From mockups to delivery, our 5-step system keeps things simple and fast.",
  },
];

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
      <section ref={heroRef} className="relative min-h-screen flex items-end bg-foreground text-background overflow-hidden pt-24 md:pt-32">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
          <img
            src={heroImage}
            alt="Team Outfits"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="w-full px-8 md:px-16 lg:px-24 relative z-20 pb-32">
          <div className="max-w-3xl">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                  Custom Outfit
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-2">
                Team Outfits by
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/70 leading-tight tracking-tight mb-6">
                TiDi Apparel
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
                Outfit your entire program with professional-grade uniforms, tracksuits, and gear. At TiDi Apparel, we specialize in custom team outfits designed for schools, clubs, leagues, and academies.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 px-10 py-6"
              >
                <Link to="/contact">Customize Now</Link>
              </Button>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-20 bg-background border-b border-border">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Our Sports
            </span>
            <h2 className="text-headline">Every Sport. Every Team.</h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {sports.map((sport, index) => (
              <motion.div
                key={sport}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="px-6 py-3 bg-foreground text-background rounded-full cursor-pointer shadow-elegant hover:shadow-luxury transition-all"
              >
                <span className="font-medium">{sport}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                  Our Process
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-background">Simple.</span>{" "}
                <span className="text-background/50">Streamlined.</span>
              </h2>
              <p className="text-background/70 mb-10">
                From initial concept to final delivery.
              </p>

              <div className="space-y-3">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-background/50">{step.number}</span>
                        <h3 className="font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-sm text-background/60">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="img-zoom rounded-lg overflow-hidden shadow-luxury">
                  <img
                    src={cricketImage}
                    alt="Cricket Player"
                    className="w-full max-w-md mx-auto"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden shadow-luxury border-4 border-foreground">
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
      <section className="py-24 bg-background">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Solutions
            </span>
            <h2 className="text-headline">Complete Outfit Solutions</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outfitSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-foreground text-background rounded-xl h-full shadow-elegant hover:shadow-luxury transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <solution.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                <p className="text-background/60 text-sm">{solution.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TiDi */}
      <section className="py-24 bg-foreground text-background">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 bg-background rounded-full" />
                  <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                    Why TiDi
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  <span className="text-background">Why Choose TiDi</span>{" "}
                  <span className="text-background/50">Team Outfits?</span>
                </h2>
              </motion.div>

              <div className="space-y-4">
                {whyChoose.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-background/5 hover:bg-background/10 transition-colors"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background text-foreground flex items-center justify-center">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-background/60">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="img-zoom rounded-lg overflow-hidden shadow-luxury">
                <img
                  src={heroImage}
                  alt="Team Athletes"
                  className="w-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent rounded-lg" />
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
      <section className="py-20 bg-background border-b border-border">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 justify-center md:justify-start"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="w-full px-8 md:px-16 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-background">Ready to Outfit</span>{" "}
              <span className="text-background/50">Your Team?</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-background/70 mb-8 max-w-2xl mx-auto"
          >
            Get started today with a free consultation and custom quote for your team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-10 py-6"
            >
              <Link to="/contact">Request Pricing</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
