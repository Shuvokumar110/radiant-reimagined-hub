import { motion } from "framer-motion";
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
    description: "Review and approve final designs.",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "Produce",
    description: "Premium quality manufacturing.",
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
  return (
    <section className="py-16 md:py-24 bg-foreground text-background overflow-hidden">
      <div className="w-full px-6 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-background rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-background/60">
              How It Works
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-background">5 Simple Steps.</span>
            <br />
            <span className="text-background/50">Stress-Free.</span>
          </h2>
        </motion.div>

        {/* Steps - Mobile: Vertical Timeline, Desktop: Horizontal */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Horizontal Layout */}
          <div className="hidden md:flex items-start justify-between gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 text-center group"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-background text-foreground flex items-center justify-center shadow-lg"
                >
                  <step.icon className="h-7 w-7" />
                </motion.div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-background/30 origin-left"
                    style={{ width: "calc(100% - 4rem)" }}
                  />
                )}

                {/* Number */}
                <span className="text-xs font-bold text-background/40 mb-1 block">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-background mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-background/60 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Vertical Layout */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background/10 border border-background/20"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background text-foreground flex items-center justify-center">
                  <step.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-background/40">
                      {step.number}
                    </span>
                    <h3 className="text-base font-semibold text-background">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-background/60">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
