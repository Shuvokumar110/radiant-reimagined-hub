import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { styleOptionsByProduct, addOnOptions } from "@/data/teamBuilderData";

export function StyleOptions() {
  const { state, dispatch, nextStep, prevStep } = useTeamBuilder();
  const { product, styleConfig } = state;

  if (!product) return null;

  const styleOptions = styleOptionsByProduct[product.id] || styleOptionsByProduct.default;

  const handleStyleChange = (optionId: string, value: string) => {
    dispatch({
      type: 'SET_STYLE_CONFIG',
      config: { [optionId]: value },
    });
  };

  const handleAddOnToggle = (addOnId: string, checked: boolean) => {
    const addOnKey = addOnId === 'extra_logo' ? 'extraLogoPlacement' 
      : addOnId === 'sponsor' ? 'sponsorPlacement'
      : addOnId === 'patch' ? 'customPatch'
      : 'playerNameAddon';
    
    dispatch({
      type: 'SET_STYLE_CONFIG',
      config: {
        addOns: {
          ...styleConfig.addOns,
          [addOnKey]: checked,
        },
      },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevStep}
          className="rounded-full shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Style Options</h2>
          <p className="text-sm text-muted-foreground">
            Customize fit and features
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Product Preview - Compact on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-muted rounded-xl flex items-center gap-4"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-foreground/5 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base md:text-lg font-semibold truncate">{product.name}</h3>
            <p className="text-muted-foreground text-sm truncate">{product.shortDescription}</p>
            <p className="text-base md:text-lg font-bold mt-0.5">From ${product.basePrice}</p>
          </div>
        </motion.div>

        {/* Style Options - Mobile optimized */}
        {styleOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="space-y-2"
          >
            <Label className="text-sm font-semibold">{option.label}</Label>
            <RadioGroup
              value={styleConfig[option.id as keyof typeof styleConfig] as string || option.defaultValue}
              onValueChange={(value) => handleStyleChange(option.id, value)}
              className="flex flex-wrap gap-2"
            >
              {option.options.map((opt) => (
                <div key={opt} className="flex items-center">
                  <RadioGroupItem
                    value={opt}
                    id={`${option.id}-${opt}`}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={`${option.id}-${opt}`}
                    className="px-3 py-1.5 text-sm rounded-full border-2 border-border cursor-pointer transition-all peer-data-[state=checked]:border-foreground peer-data-[state=checked]:bg-foreground peer-data-[state=checked]:text-background hover:border-foreground/50"
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>
        ))}

        {/* Add-Ons - Single column on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <Label className="text-sm font-semibold">Add-On Options</Label>
          <div className="space-y-2">
            {addOnOptions.map((addOn) => {
              const addOnKey = addOn.id === 'extra_logo' ? 'extraLogoPlacement' 
                : addOn.id === 'sponsor' ? 'sponsorPlacement'
                : addOn.id === 'patch' ? 'customPatch'
                : 'playerNameAddon';
              const isChecked = styleConfig.addOns[addOnKey as keyof typeof styleConfig.addOns];

              return (
                <div
                  key={addOn.id}
                  className={`
                    p-3 rounded-lg border-2 transition-all cursor-pointer
                    ${isChecked 
                      ? 'border-foreground bg-foreground/5' 
                      : 'border-border hover:border-foreground/30'
                    }
                  `}
                  onClick={() => handleAddOnToggle(addOn.id, !isChecked)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) => handleAddOnToggle(addOn.id, checked as boolean)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm">{addOn.label}</span>
                        <span className="text-sm font-semibold shrink-0">+${addOn.price}/ea</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {addOn.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-end pt-4">
          <Button size="lg" onClick={nextStep} className="gap-2 w-full sm:w-auto">
            Next: Customize Design
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}