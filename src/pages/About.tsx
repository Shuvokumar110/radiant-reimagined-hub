import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Award, Palette, Clock, Users } from "lucide-react";

import cricketImage from "@/assets/about-cricket.png";
import hockeyImage from "@/assets/about-hockey.png";
import soccerImage from "@/assets/about-soccer.png";
import cricketActionImage from "@/assets/about-cricket-action.png";
import teamImage from "@/assets/about-team.png";

const whyChoose = [
  {
    icon: <Award className="h-7 w-7" />,
    title: "Premium Quality",
    description: "Breathable, moisture-wicking fabrics that last season after season.",
  },
  {
    icon: <Palette className="h-7 w-7" />,
    title: "Full Customization",
    description: "Your colors, your logo, your name and number — exactly the way you want them.",
  },
  {
    icon: <Clock className="h-7 w-7" />,
    title: "Fast & Reliable",
    description: "Standard 10–14 day turnaround with rush options for urgent orders.",
  },
  {
    icon: <Users className="h-7 w-7" />,
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
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center bg-foreground text-background overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 z-10" />
          <img
            src={teamImage}
            alt="TiDi Team"
            className="w-full h-full object-cover object-center opacity-50"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <FadeInUp>
              <div className="flex items-center gap-2 text-sm text-background/60 mb-8">
                <Link to="/" className="hover:text-background transition-colors">Home</Link>
                <span>/</span>
                <span className="text-background">About us</span>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <span className="inline-block px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-sm font-medium mb-6 border border-background/20">
                About Us
              </span>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-background to-background/70">
                  TiDi Apparel
                </span>
              </h1>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeInUp>
                <span className="inline-block px-4 py-2 rounded-full bg-foreground/10 text-sm font-medium mb-4">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  Think it... <span className="text-muted-foreground">Do it.</span>
                </h2>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  TiDi Apparel, the official apparel division of TiDi Nation, is built on the spirit of our name—Think it...Do it (TiDi). Represented by our Infinity Logo, TiDi reflects the belief that there are no limits to what athletes, teams and organizations can achieve.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We deliver 100% custom designs that unite performance, style, and identity for clubs, schools, academies, and federations. Every order is backed by premium materials, seamless production, and reliable delivery, ensuring athletes look, feel, and perform at their best.
                </p>
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond uniforms, we support events and organizations with custom merchandise, awards, and branding solutions that elevate both the athlete and fan experience. By leveraging the power of sports and everything within TiDi Nation, we extend our mission of empowerment across apparel, technology, music, and culture. At TiDi Apparel, we don't just make uniforms—we build opportunities, pride, and futures.
                </p>
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
                    className="rounded-2xl overflow-hidden shadow-elegant"
                  >
                    <img src={cricketImage} alt="Cricket Player" className="w-full h-64 object-cover" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden shadow-elegant"
                  >
                    <img src={soccerImage} alt="Soccer Player" className="w-full h-48 object-cover" />
                  </motion.div>
                </div>
                <div className="space-y-4 pt-8">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden shadow-elegant"
                  >
                    <img src={hockeyImage} alt="Hockey Player" className="w-full h-48 object-cover" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl overflow-hidden shadow-elegant"
                  >
                    <img src={cricketActionImage} alt="Cricket Action" className="w-full h-64 object-cover" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose TiDi */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm text-sm font-medium mb-4 border border-background/20">
                Why TiDi
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold">
                Why Choose <span className="text-background/60">TiDi?</span>
              </h2>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group p-8 bg-background/5 hover:bg-background/10 rounded-2xl h-full transition-all border border-background/10"
                >
                  <div className="w-14 h-14 rounded-full bg-background text-foreground flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-background/70">{item.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Image Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-foreground/10 text-sm font-medium mb-4">
                Our Athletes
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Teams Trust <span className="text-muted-foreground">TiDi</span>
              </h2>
            </div>
          </FadeInUp>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-luxury"
          >
            <img
              src={teamImage}
              alt="TiDi Team"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-background">
              <p className="text-lg md:text-xl max-w-2xl">
                By working directly with teams, we're able to deliver consistent quality, customized designs, and gear that keeps every player looking and feeling their best.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Ready to Join TiDi Nation?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-background/70 mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get started with a free consultation today.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <Button
              asChild
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 px-12 py-6 text-lg"
            >
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
