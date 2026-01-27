import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem, AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Award, Palette, Clock, Users } from "lucide-react";

import cricketImage from "@/assets/about-cricket.png";
import hockeyImage from "@/assets/about-hockey.png";
import soccerImage from "@/assets/about-soccer.png";
import cricketActionImage from "@/assets/about-cricket-action.png";
import teamImage from "@/assets/about-team.png";

const whyChoose = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Breathable, moisture-wicking fabrics that last season after season.",
  },
  {
    icon: Palette,
    title: "Full Customization",
    description: "Your colors, your logo, your name and number — exactly the way you want them.",
  },
  {
    icon: Clock,
    title: "Fast & Reliable",
    description: "Standard 10–14 day turnaround with rush options for urgent orders.",
  },
  {
    icon: Users,
    title: "Trusted by Teams",
    description: "From local leagues to national tournaments, teams count on TiDi for top-quality gear.",
  },
];

export default function About() {
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
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center bg-foreground text-background overflow-hidden pt-24 md:pt-32">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
          <img
            src={teamImage}
            alt="TiDi Team"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="w-full px-8 md:px-16 lg:px-24 relative z-20 pt-32 pb-16 md:pb-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <FadeInUp>
              <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white">About us</span>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-white/70">
                  About Us
                </span>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-2">
                Welcome to
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/70 leading-tight tracking-tight">
                TiDi Apparel
              </h2>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background relative overflow-hidden">
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

        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeInUp>
                <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
                  Our Story
                </span>
              </FadeInUp>

              <AnimatedText
                text="Think it... Do it."
                className="text-headline mb-8"
                delay={0.2}
              />

              <FadeInUp delay={0.3}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  TiDi Apparel, the official apparel division of TiDi Nation, is built on the spirit of our name—Think it...Do it (TiDi). Represented by our Infinity Logo, TiDi reflects the belief that there are no limits to what athletes, teams and organizations can achieve.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.4}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We deliver 100% custom designs that unite performance, style, and identity for clubs, schools, academies, and federations. Every order is backed by premium materials, seamless production, and reliable delivery, ensuring athletes look, feel, and perform at their best.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.5}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond uniforms, we support events and organizations with custom merchandise, awards, and branding solutions that elevate both the athlete and fan experience. At TiDi Apparel, we don't just make uniforms—we build opportunities, pride, and futures.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.6}>
                <div className="flex gap-12 mt-8">
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

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="img-zoom rounded-lg overflow-hidden shadow-luxury"
                  >
                    <img src={cricketImage} alt="Cricket Player" className="w-full h-64 object-cover" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="img-zoom rounded-lg overflow-hidden shadow-luxury"
                  >
                    <img src={soccerImage} alt="Soccer Player" className="w-full h-48 object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="img-zoom rounded-lg overflow-hidden shadow-luxury"
                  >
                    <img src={hockeyImage} alt="Hockey Player" className="w-full h-48 object-cover" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="img-zoom rounded-lg overflow-hidden shadow-luxury"
                  >
                    <img src={cricketActionImage} alt="Cricket Action" className="w-full h-64 object-cover" />
                  </motion.div>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-64 h-64 border border-foreground/20 rounded-lg z-0 hidden lg:block"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose TiDi */}
      <section className="py-24 bg-foreground text-background">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Why TiDi
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="text-background">Why Choose</span>{" "}
              <span className="text-background/50">TiDi?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-8 bg-background/5 hover:bg-background/10 rounded-xl h-full transition-all border border-background/10"
              >
                <div className="w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-background/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-24 bg-background">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4 block">
              Our Athletes
            </span>
            <h2 className="text-headline">Teams Trust TiDi</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-luxury"
          >
            <img
              src={teamImage}
              alt="TiDi Team"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-lg md:text-xl max-w-2xl">
                By working directly with teams, we're able to deliver consistent quality, customized designs, and gear that keeps every player looking and feeling their best.
              </p>
            </div>
          </motion.div>
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
              <span className="text-background">Ready to Join</span>{" "}
              <span className="text-background/50">TiDi Nation?</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-background/70 mb-8 max-w-2xl mx-auto"
          >
            Let's create something amazing together. Get started with a free consultation today.
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
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
