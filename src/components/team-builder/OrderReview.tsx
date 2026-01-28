import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { sportCategories } from "@/data/teamBuilderData";

export function OrderReview() {
  const { state, dispatch, nextStep, prevStep, calculateTotal } = useTeamBuilder();
  const { sport, product, styleConfig, designConfig, roster, deliveryOption, proofFirst } = state;

  const sportInfo = sportCategories.find(s => s.id === sport);
  const totals = calculateTotal();

  const getSizeBreakdown = () => {
    const breakdown: Record<string, number> = {};
    roster.forEach(entry => {
      breakdown[entry.size] = (breakdown[entry.size] || 0) + entry.quantity;
    });
    return breakdown;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Review Your Order</h2>
          <p className="text-muted-foreground">Confirm details before checkout</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Design Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-muted rounded-2xl"
          >
            <Label className="text-sm font-semibold mb-4 block">Design Preview</Label>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Front Preview */}
              <div 
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${designConfig.primaryColor} 0%, ${designConfig.secondaryColor} 100%)`,
                }}
              >
                <div className="text-center" style={{ color: designConfig.teamNameColor }}>
                  <span className="text-sm uppercase tracking-wider block mb-2">Front</span>
                  <span className="text-lg font-bold">{designConfig.teamName || 'Team Name'}</span>
                  {designConfig.frontNumber && (
                    <span className="block text-4xl font-bold mt-2" style={{ color: designConfig.secondaryColor }}>23</span>
                  )}
                </div>
              </div>
              {/* Back Preview */}
              <div 
                className="aspect-square rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${designConfig.primaryColor} 0%, ${designConfig.secondaryColor} 100%)`,
                }}
              >
                <div className="text-center" style={{ color: designConfig.secondaryColor }}>
                  <span className="text-sm uppercase tracking-wider block mb-2">Back</span>
                  <span className="text-sm font-bold block">PLAYER</span>
                  {designConfig.backNumber && (
                    <span className="text-6xl font-bold mt-1 block">23</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 border rounded-2xl space-y-4"
          >
            <Label className="text-sm font-semibold">Product Details</Label>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Sport:</span>
                <span className="ml-2 font-medium">{sportInfo?.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Product:</span>
                <span className="ml-2 font-medium">{product?.name}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Fabric:</span>
                <span className="ml-2 font-medium">{product?.fabricType}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <span className="ml-2 font-medium">{styleConfig.gender}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Fit:</span>
                <span className="ml-2 font-medium">{styleConfig.fit}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Pattern:</span>
                <span className="ml-2 font-medium capitalize">{designConfig.pattern}</span>
              </div>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-muted-foreground">Colors:</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full border" style={{ background: designConfig.primaryColor }} title="Primary" />
                <div className="w-8 h-8 rounded-full border" style={{ background: designConfig.secondaryColor }} title="Secondary" />
                <div className="w-8 h-8 rounded-full border" style={{ background: designConfig.accentColor }} title="Accent" />
              </div>
            </div>

            {/* Add-ons */}
            {(styleConfig.addOns.extraLogoPlacement || styleConfig.addOns.sponsorPlacement || 
              styleConfig.addOns.customPatch || styleConfig.addOns.playerNameAddon) && (
              <div className="pt-2">
                <span className="text-sm text-muted-foreground">Add-ons:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {styleConfig.addOns.extraLogoPlacement && (
                    <span className="px-2 py-1 bg-muted rounded text-xs">Extra Logo</span>
                  )}
                  {styleConfig.addOns.sponsorPlacement && (
                    <span className="px-2 py-1 bg-muted rounded text-xs">Sponsor</span>
                  )}
                  {styleConfig.addOns.customPatch && (
                    <span className="px-2 py-1 bg-muted rounded text-xs">Custom Patch</span>
                  )}
                  {styleConfig.addOns.playerNameAddon && (
                    <span className="px-2 py-1 bg-muted rounded text-xs">Player Names</span>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Roster Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 border rounded-2xl space-y-4"
          >
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Roster Summary</Label>
              <span className="text-sm text-muted-foreground">{roster.length} players, {totals.quantity} items</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {Object.entries(getSizeBreakdown()).map(([size, count]) => (
                <div key={size} className="px-4 py-2 bg-muted rounded-full text-sm">
                  <span className="font-semibold">{size}:</span> {count}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Delivery Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 border rounded-2xl space-y-4"
          >
            <Label className="text-sm font-semibold">Delivery Option</Label>
            <RadioGroup
              value={deliveryOption}
              onValueChange={(value) => dispatch({ type: 'SET_DELIVERY_OPTION', option: value as 'standard' | 'rush' })}
              className="space-y-3"
            >
              <div className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryOption === 'standard' ? 'border-foreground bg-foreground/5' : 'border-border'}`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <div>
                    <Label htmlFor="standard" className="font-medium cursor-pointer flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Standard Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground">3-4 weeks production + shipping</p>
                  </div>
                </div>
                <span className="font-semibold">Included</span>
              </div>
              
              <div className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${deliveryOption === 'rush' ? 'border-foreground bg-foreground/5' : 'border-border'}`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="rush" id="rush" />
                  <div>
                    <Label htmlFor="rush" className="font-medium cursor-pointer flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" /> Rush Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground">1-2 weeks production + expedited shipping</p>
                  </div>
                </div>
                <span className="font-semibold text-yellow-600">+20%</span>
              </div>
            </RadioGroup>
          </motion.div>
        </div>

        {/* Right Column - Pricing */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="sticky top-24 p-6 bg-foreground text-background rounded-2xl space-y-4"
          >
            <Label className="text-sm font-semibold opacity-70">Order Summary</Label>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Unit Price</span>
                <span>${totals.unitPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Quantity</span>
                <span>× {totals.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              
              {totals.addOnFees > 0 && (
                <div className="flex justify-between">
                  <span className="opacity-70">Add-on Fees</span>
                  <span>+${totals.addOnFees.toFixed(2)}</span>
                </div>
              )}
              
              {totals.rushFee > 0 && (
                <div className="flex justify-between text-yellow-400">
                  <span>Rush Fee</span>
                  <span>+${totals.rushFee.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="opacity-70">Est. Shipping</span>
                <span>${totals.estimatedShipping.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="opacity-70">Est. Tax</span>
                <span>${totals.estimatedTax.toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="bg-background/20" />
            
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>

            {totals.quantity >= 20 && (
              <div className="p-3 bg-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Bulk discount applied ({totals.quantity >= 50 ? '15%' : '10%'} off)</span>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={nextStep}
                className="w-full gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => dispatch({ type: 'SET_PROOF_FIRST', proofFirst: true })}
                className="w-full bg-transparent text-background border-background/30 hover:bg-background/10"
              >
                Request Proof First
              </Button>
            </div>

            <p className="text-xs opacity-50 text-center">
              Final pricing confirmed after proof approval
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
