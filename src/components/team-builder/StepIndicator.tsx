import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTeamBuilder } from "@/context/TeamBuilderContext";

const steps = [
  { id: 0, label: "Sport" },
  { id: 1, label: "Product" },
  { id: 2, label: "Style" },
  { id: 3, label: "Design" },
  { id: 4, label: "Roster" },
  { id: 5, label: "Review" },
  { id: 6, label: "Checkout" },
];

export function StepIndicator() {
  const { state, goToStep } = useTeamBuilder();
  const { currentStep } = state;

  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => step.id < currentStep && goToStep(step.id)}
              disabled={step.id > currentStep}
              className={`
                flex flex-col items-center gap-2 group
                ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                  backgroundColor: 
                    step.id < currentStep 
                      ? 'hsl(var(--foreground))' 
                      : step.id === currentStep 
                        ? 'hsl(var(--foreground))' 
                        : 'hsl(var(--muted))',
                }}
                className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${step.id < currentStep 
                    ? 'text-background' 
                    : step.id === currentStep 
                      ? 'text-background ring-4 ring-foreground/20' 
                      : 'text-muted-foreground'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <span className="text-xs md:text-sm font-semibold">{step.id + 1}</span>
                )}
              </motion.div>
              <span 
                className={`
                  text-xs font-medium hidden sm:block
                  ${step.id === currentStep 
                    ? 'text-foreground' 
                    : 'text-muted-foreground'
                  }
                `}
              >
                {step.label}
              </span>
            </button>
            
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4">
                <div 
                  className={`
                    h-0.5 w-8 md:w-12 lg:w-16
                    ${step.id < currentStep 
                      ? 'bg-foreground' 
                      : 'bg-muted'
                    }
                  `}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
