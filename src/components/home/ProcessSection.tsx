import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, Pencil, ThumbsUp, Package, PartyPopper } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us Your Vision",
    subtitle: "Let's Talk",
    description: "Share your ideas, team colors, and goals. We're all ears and ready to bring your vision to life.",
    icon: MessageSquare,
    highlight: "Free consultation",
  },
  {
    number: "02",
    title: "We Craft Your Design",
    subtitle: "Custom Creation",
    description: "Our designers create stunning mockups that capture your team's unique identity and spirit.",
    icon: Pencil,
    highlight: "Unlimited revisions",
  },
  {
    number: "03",
    title: "You Approve",
    subtitle: "Your Call",
    description: "Review every detail until it's perfect. Your satisfaction is our priority before production begins.",
    icon: ThumbsUp,
    highlight: "100% satisfaction",
  },
  {
    number: "04",
    title: "Premium Production",
    subtitle: "Quality Made",
    description: "Crafted with premium materials and meticulous attention to detail in our state-of-the-art facility.",
    icon: Package,
    highlight: "14-day turnaround",
  },
  {
    number: "05",
    title: "Celebrate Together",
    subtitle: "Game Day Ready",
    description: "Your team gear arrives, ready to make a statement. Time to look and feel like champions!",
    icon: PartyPopper,
    highlight: "Worldwide delivery",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Horizontal scroll transformation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  
  // Progress line width
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="h-[400vh] bg-foreground text-background relative">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-16 lg:px-24 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          >
            <div>
              <motion.span 
                className="text-sm font-medium tracking-widest uppercase text-background/50 mb-2 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Your Journey With Us
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                From Idea to <span className="italic font-serif">Reality</span>
              </h2>
            </div>
            
            {/* Progress Counter */}
            <motion.div className="flex items-center gap-4">
              <span className="text-background/50 text-sm">Scroll to explore</span>
              <div className="w-24 h-1 bg-background/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-background rounded-full"
                  style={{ width: lineWidth }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-background/10 -translate-y-1/2 hidden md:block" />
          
          <motion.div 
            className="flex gap-6 md:gap-8 px-8 md:px-16 lg:px-24"
            style={{ x }}
          >
            {steps.map((step, index) => (
              <JourneyCard 
                key={step.number} 
                step={step} 
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
            
            {/* Final CTA Card */}
            <motion.div 
              className="flex-shrink-0 w-[320px] md:w-[400px] h-[380px] md:h-[420px] rounded-2xl bg-background text-foreground flex flex-col items-center justify-center p-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center mb-6"
              >
                <span className="text-3xl font-bold">?</span>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Ready to Start?</h3>
              <p className="text-foreground/60 mb-6">Let's create something amazing for your team together.</p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-semibold text-sm hover:bg-foreground/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div 
          className="px-8 md:px-16 lg:px-24 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-8 md:gap-16 justify-center md:justify-start">
            {[
              { value: "500+", label: "Teams Outfitted" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "14", label: "Day Turnaround" },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <span className="text-3xl md:text-4xl font-bold font-serif">{stat.value}</span>
                <p className="text-sm text-background/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function JourneyCard({ 
  step, 
  index,
  scrollProgress 
}: { 
  step: typeof steps[0]; 
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Each card becomes active at different scroll points
  const stepStart = index * 0.18;
  const stepPeak = stepStart + 0.1;
  const stepEnd = stepStart + 0.2;
  
  const scale = useTransform(
    scrollProgress,
    [stepStart, stepPeak, stepEnd],
    [0.9, 1.05, 0.95]
  );

  const opacity = useTransform(
    scrollProgress,
    [stepStart, stepPeak, stepEnd],
    [0.5, 1, 0.7]
  );

  const y = useTransform(
    scrollProgress,
    [stepStart, stepPeak, stepEnd],
    [20, -10, 10]
  );

  const rotate = useTransform(
    scrollProgress,
    [stepStart, stepPeak, stepEnd],
    [-2, 0, 2]
  );

  return (
    <motion.div
      style={{ scale, opacity, y, rotate }}
      className="flex-shrink-0 w-[320px] md:w-[400px] h-[380px] md:h-[420px] rounded-2xl bg-background/5 backdrop-blur-md border border-background/10 p-6 md:p-8 flex flex-col relative overflow-hidden group"
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Step Number - Large Background */}
      <span className="absolute -right-4 -top-8 text-[140px] font-bold text-background/5 font-serif select-none">
        {step.number}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className="w-14 h-14 rounded-xl bg-background text-foreground flex items-center justify-center"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <step.icon className="h-6 w-6" />
          </motion.div>
          <span className="text-xs font-bold tracking-wider text-background/40">
            STEP {step.number}
          </span>
        </div>

        {/* Subtitle */}
        <span className="text-sm font-medium text-background/50 mb-2">{step.subtitle}</span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">{step.title}</h3>

        {/* Description */}
        <p className="text-background/60 text-sm md:text-base flex-1">{step.description}</p>

        {/* Highlight Badge */}
        <motion.div 
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full self-start"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
        >
          <span className="w-2 h-2 rounded-full bg-background animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">{step.highlight}</span>
        </motion.div>
      </div>

      {/* Bottom Connection Dot */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-background/30 hidden md:block" />
    </motion.div>
  );
}
