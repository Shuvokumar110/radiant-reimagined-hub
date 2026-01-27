import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { DollarSign, Globe, Palette, BarChart3, Shield, UserPlus, Share2, Gift, Calendar, Award } from "lucide-react";

import heroImage from "@/assets/affiliate-hero.png";

const whyJoin = [
  {
    icon: DollarSign,
    title: "Competitive Commissions",
    description: "Earn 15% on every sale you refer.",
  },
  {
    icon: Globe,
    title: "Worldwide Reach",
    description: "Our gear ships globally, so your audience isn't limited.",
  },
  {
    icon: Palette,
    title: "Custom Products",
    description: "From soccer kits to basketball uniforms and fan gear, we've got something for every player and every fan.",
  },
  {
    icon: BarChart3,
    title: "Track Your Success",
    description: "Easy-to-use affiliate dashboard to monitor clicks, sales, and payouts in real time.",
  },
  {
    icon: Shield,
    title: "Trusted Brand",
    description: "TiDi has been outfitting clubs and fans worldwide with top-quality gear since 2013.",
  },
];

const howItWorks = [
  { number: "01", title: "Sign Up", description: "Join for free and get approved.", icon: UserPlus },
  { number: "02", title: "Get Your Link", description: "Receive your unique affiliate link.", icon: Share2 },
  { number: "03", title: "Share & Promote", description: "Share it with your audience.", icon: Gift },
  { number: "04", title: "Earn Commissions", description: "Earn whenever someone shops through your link.", icon: DollarSign },
];

const benefits = [
  { icon: Gift, title: "Exclusive Promotions", description: "Special offers to share with your followers." },
  { icon: Calendar, title: "Early Access", description: "First look at new product drops." },
  { icon: DollarSign, title: "Monthly Payouts", description: "Reliable, on-time commission payments." },
  { icon: Award, title: "Top Performer Rewards", description: "Special rewards for our best affiliates." },
];

export default function AffiliateProgram() {
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
      <section ref={heroRef} className="relative min-h-[70vh] flex items-end bg-foreground text-background overflow-hidden pt-24 md:pt-32">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
          <img
            src={heroImage}
            alt="Affiliate Program"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="w-full px-8 md:px-16 lg:px-24 relative z-20 pb-16 md:pb-20">
          <div className="max-w-3xl">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                  Affiliate Program
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-2">
                Join the TiDi Nation
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/70 leading-tight tracking-tight mb-6">
                Affiliate Program
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
                At TiDi Nation, we believe in teamwork on and off the field. Whether you're a coach, athlete, parent, blogger, or sports enthusiast, you can earn money by promoting our premium uniforms, fan gear, and accessories.
              </p>
            </FadeInUp>
            <FadeInUp delay={0.3}>
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 px-10 py-6"
              >
                <Link to="/contact">Join Affiliate Program</Link>
              </Button>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Benefits
            </span>
            <h2 className="text-headline">Why Join?</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {whyJoin.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-foreground text-background rounded-xl shadow-elegant hover:shadow-luxury transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-background/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-foreground text-background">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                  How It Works
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-background">Simple Process.</span>{" "}
                <span className="text-background/50">Big Rewards.</span>
              </h2>
              <p className="text-background/70 mb-10">
                The process is simple: sign up for free, receive your unique affiliate link, share it with your audience, and earn commissions whenever someone shops through your link.
              </p>

              <div className="space-y-3">
                {howItWorks.map((step, index) => (
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
              <div className="img-zoom rounded-lg overflow-hidden shadow-luxury">
                <img
                  src={heroImage}
                  alt="Affiliate Partnership"
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Program Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
                About The Program
              </span>
              <h2 className="text-headline mb-6">Partner for Growth</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As an affiliate, you'll enjoy competitive commissions on every sale you refer, backed by the strength of a global brand that has been outfitting teams since 2013. Our easy-to-use dashboard allows you to track your clicks, sales, and payouts in real time, so you always know how your efforts are performing.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With worldwide shipping and a wide range of products—from custom soccer kits and basketball uniforms to hoodies, caps, and fan gear—you'll always have something valuable to promote.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We welcome coaches, athletes, influencers, bloggers, and everyday fans who love sports and want to be part of the TiDi Nation movement.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-foreground/5 rounded-xl hover:bg-foreground/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center mb-4">
                    <benefit.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-foreground text-background">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-background">Ready to Join</span>{" "}
              <span className="text-background/50">the Nation?</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-background/70 mb-4 max-w-2xl mx-auto"
          >
            Apply today and become part of a global community that lives by our motto:
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-bold text-background mb-8"
          >
            Think it. Do it. Wear it.
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
              <Link to="/contact">Join Affiliate Program</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
