import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Palette, CheckCircle, Factory, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Plan",
    description: "Work with our team to define your vision, team colors, and requirements.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Design",
    description: "Our designers create custom mockups tailored to your team's identity.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Approve",
    description: "Review detailed proofs and approve final designs before production.",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "Produce",
    description: "Premium manufacturing with quality materials and attention to detail.",
    icon: Factory,
  },
  {
    number: "05",
    title: "Deliver",
    description: "Fast, reliable worldwide delivery straight to your doorstep.",
    icon: Truck,
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="min-h-[250vh] bg-foreground text-background relative">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-8 md:px-16 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Header & Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-xs font-medium tracking-widest uppercase text-background/60">
                  How It Works
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-background">5 Steps to Greatness.</span>
                <br />
                <span className="text-background/50">Seamless & Stress-Free.</span>
              </h2>
              <p className="text-background/70 mb-10">
                From initial concept to final delivery.
              </p>

              {/* Progress Ring */}
              <div className="relative w-48 h-48 mx-auto lg:mx-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="opacity-20"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      pathLength: progress,
                    }}
                    className="stroke-background"
                  />
                </svg>
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.span className="text-5xl font-serif font-bold">
                    {steps.length}
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <ProcessStepCard 
                  key={step.number} 
                  step={step} 
                  index={index} 
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepCard({ 
  step, 
  index, 
  scrollProgress 
}: { 
  step: typeof steps[0]; 
  index: number; 
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Calculate when this step should be active based on scroll
  const stepStart = 0.1 + (index * 0.15);
  const stepEnd = stepStart + 0.15;
  
  const opacity = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [0.4, 1, 1, 0.4]
  );

  const scale = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [0.95, 1.02, 1.02, 0.95]
  );

  const x = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [20, 0, 0, -20]
  );

  return (
    <motion.div
      style={{ opacity, scale, x }}
      className="relative flex items-center gap-5 p-5 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-background text-foreground flex items-center justify-center">
        <step.icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-xs font-bold text-background/60">{step.number}</span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
        </div>
        <p className="text-sm text-background/70">{step.description}</p>
      </div>

      {/* Active indicator line */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-background rounded-r-full"
        style={{ opacity }}
      />
    </motion.div>
  );
}
