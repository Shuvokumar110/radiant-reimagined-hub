import { motion } from "framer-motion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";
import { ClipboardList, Palette, CheckCircle, Factory, Truck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Plan",
    description: "Work with our team to define your vision and requirements",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Design",
    description: "Custom designs tailored to your team's identity and colors",
    icon: Palette,
  },
  {
    number: "03",
    title: "Approve",
    description: "Review and approve mockups before production begins",
    icon: CheckCircle,
  },
  {
    number: "04",
    title: "Produce",
    description: "Premium manufacturing with quality materials",
    icon: Factory,
  },
  {
    number: "05",
    title: "Deliver",
    description: "Fast, reliable delivery worldwide to your doorstep",
    icon: Truck,
  },
];

export function ProcessSection() {
  return (
    <section className="py-32 bg-foreground text-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 noise-overlay" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <FadeInUp>
            <span className="text-sm font-medium tracking-widest uppercase text-background/60 mb-4 block">
              How It Works
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-headline">5 Steps to Greatness</h2>
          </FadeInUp>
        </div>

        <StaggerContainer className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-background/20 hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative text-center group"
                >
                  {/* Step Number */}
                  <div className="relative z-10 mx-auto mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 mx-auto bg-background text-foreground rounded-full flex items-center justify-center shadow-luxury"
                    >
                      <step.icon className="h-8 w-8" />
                    </motion.div>
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-foreground border-2 border-background rounded-full flex items-center justify-center text-xs font-bold">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-background/70 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connecting Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="h-8 w-px bg-background/20 mx-auto mt-6 lg:hidden" />
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
