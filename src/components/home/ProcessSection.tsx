import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ClipboardList, Palette, CheckCircle, Factory, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Plan",
    description: "Define your vision and requirements.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Design",
    description: "Custom mockups for your team.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Approve",
    description: "Review and approve designs.",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "Produce",
    description: "Premium manufacturing.",
    icon: Factory,
  },
  {
    number: "05",
    title: "Deliver",
    description: "Fast worldwide delivery.",
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
    <section ref={containerRef} className="min-h-[200vh] md:min-h-[250vh] bg-foreground text-background relative">
      {/* Sticky Container */}
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden py-8 md:py-0">
        <div className="w-full px-4 md:px-16 lg:px-24">
          {/* Mobile Layout - Single Column */}
          <div className="flex flex-col lg:hidden">
            {/* Header & Progress */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background/10 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-background rounded-full" />
                <span className="text-[10px] font-medium tracking-widest uppercase text-background/60">
                  How It Works
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                <span className="text-background">5 Simple Steps.</span>
                <br />
                <span className="text-background/50">Stress-Free.</span>
              </h2>
              
              {/* Progress Ring - Mobile */}
              <div className="relative w-20 h-20 mx-auto mt-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="opacity-20"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength: progress }}
                    className="stroke-background"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{steps.length}</span>
                </div>
              </div>
            </div>

            {/* Steps - Mobile */}
            <div className="space-y-2">
              {steps.map((step, index) => (
                <ProcessStepCard
                  key={step.number}
                  step={step}
                  index={index}
                  scrollProgress={scrollYProgress}
                  isMobile
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout - Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center">
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
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-background">5 Simple Steps.</span>
                <br />
                <span className="text-background/50">Stress-Free.</span>
              </h2>
              <p className="text-background/70 mb-10">
                From initial concept to final delivery.
              </p>

              {/* Progress Ring - Desktop */}
              <div className="relative w-48 h-48">
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
                    style={{ pathLength: progress }}
                    className="stroke-background"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold">{steps.length}</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Steps */}
            <div className="space-y-3">
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
  scrollProgress,
  isMobile = false,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isMobile?: boolean;
}) {
  const stepStart = 0.1 + index * 0.15;
  const stepEnd = stepStart + 0.15;

  const opacity = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [0.4, 1, 1, 0.4]
  );

  const scale = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [0.97, 1.02, 1.02, 0.97]
  );

  const x = useTransform(
    scrollProgress,
    [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
    [10, 0, 0, -10]
  );

  return (
    <motion.div
      style={{ opacity, scale, x }}
      className={`relative flex items-center gap-3 md:gap-4 rounded-xl bg-background/10 backdrop-blur-sm border border-background/20 ${
        isMobile ? "p-3" : "p-4"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 rounded-full bg-background text-foreground flex items-center justify-center ${
          isMobile ? "w-10 h-10" : "w-12 h-12"
        }`}
      >
        <step.icon className={isMobile ? "h-4 w-4" : "h-5 w-5"} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`font-bold text-background/50 ${isMobile ? "text-[10px]" : "text-xs"}`}>
            {step.number}
          </span>
          <h3 className={`font-semibold ${isMobile ? "text-sm" : "text-base"}`}>
            {step.title}
          </h3>
        </div>
        <p className={`text-background/60 ${isMobile ? "text-xs" : "text-sm"}`}>
          {step.description}
        </p>
      </div>

      {/* Active indicator */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-background rounded-r-full"
        style={{ opacity }}
      />
    </motion.div>
  );
}
