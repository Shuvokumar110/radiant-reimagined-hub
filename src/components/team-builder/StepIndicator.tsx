import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useTeamBuilder } from "@/context/TeamBuilderContext";

const steps = [
  { id: 0, label: "Sport", shortLabel: "1" },
  { id: 1, label: "Product", shortLabel: "2" },
  { id: 2, label: "Design", shortLabel: "3" },
  { id: 3, label: "Style", shortLabel: "4" },
  { id: 4, label: "Roster", shortLabel: "5" },
  { id: 5, label: "Review", shortLabel: "6" },
  { id: 6, label: "Checkout", shortLabel: "7" },
];

export function StepIndicator() {
  const { state, goToStep } = useTeamBuilder();
  const { currentStep } = state;

  return (
    <div className="w-full py-4 md:py-6 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-start md:justify-center min-w-max md:min-w-0 px-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => step.id < currentStep && goToStep(step.id)}
              disabled={step.id > currentStep}
              className={`
                flex flex-col items-center gap-1.5 group
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
                  w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${step.id < currentStep 
                    ? 'text-background' 
                    : step.id === currentStep 
                      ? 'text-background ring-2 ring-foreground/20' 
                      : 'text-muted-foreground'
                  }
                `}
              >
                {step.id < currentStep ? (
                  <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                ) : (
                  <span className="text-xs md:text-sm font-semibold">{step.id + 1}</span>
                )}
              </motion.div>
              <span 
                className={`
                  text-[10px] md:text-xs font-medium whitespace-nowrap
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
              <div className="mx-1.5 md:mx-3">
                <div 
                  className={`
                    h-0.5 w-6 md:w-10 lg:w-14
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
