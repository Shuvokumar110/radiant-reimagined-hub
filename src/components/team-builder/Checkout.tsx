import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Calendar, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useTeamBuilder } from "@/context/TeamBuilderContext";

export function Checkout() {
  const { state, dispatch, prevStep, calculateTotal } = useTeamBuilder();
  const { shippingAddress, billingAddress, needByDate, specialInstructions, proofFirst } = state;
  const { toast } = useToast();
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const totals = calculateTotal();

  const updateShipping = (updates: Partial<typeof shippingAddress>) => {
    dispatch({ type: 'SET_SHIPPING_ADDRESS', address: { ...shippingAddress, ...updates } });
  };

  const updateBilling = (updates: Partial<typeof billingAddress>) => {
    dispatch({ type: 'SET_BILLING_ADDRESS', address: { ...billingAddress, ...updates } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) return;
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: proofFirst ? "Proof Request Submitted!" : "Order Submitted!",
      description: proofFirst 
        ? "We'll send your design proof within 24-48 hours. You'll be notified when it's ready for review."
        : "Thank you for your order. You'll receive a confirmation email shortly with your Order ID and production timeline.",
    });

    setIsSubmitting(false);
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={prevStep} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {proofFirst ? 'Request Design Proof' : 'Checkout'}
          </h2>
          <p className="text-muted-foreground">
            {proofFirst ? 'Provide your details to receive a design proof' : 'Complete your order'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 border rounded-2xl space-y-4"
            >
              <Label className="text-lg font-semibold">Shipping Address</Label>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label className="text-sm mb-2 block">Full Name</Label>
                  <Input
                    value={shippingAddress.name}
                    onChange={(e) => updateShipping({ name: e.target.value })}
                    placeholder="Team or contact name"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm mb-2 block">Street Address</Label>
                  <Input
                    value={shippingAddress.address}
                    onChange={(e) => updateShipping({ address: e.target.value })}
                    placeholder="123 Main St"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">City</Label>
                  <Input
                    value={shippingAddress.city}
                    onChange={(e) => updateShipping({ city: e.target.value })}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">State</Label>
                  <Input
                    value={shippingAddress.state}
                    onChange={(e) => updateShipping({ state: e.target.value })}
                    placeholder="State"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">ZIP Code</Label>
                  <Input
                    value={shippingAddress.zip}
                    onChange={(e) => updateShipping({ zip: e.target.value })}
                    placeholder="12345"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-2 block">Country</Label>
                  <Input
                    value={shippingAddress.country}
                    onChange={(e) => updateShipping({ country: e.target.value })}
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* Billing Address */}
            {!proofFirst && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 border rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-semibold">Billing Address</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="same-as-shipping"
                      checked={sameAsBilling}
                      onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                    />
                    <Label htmlFor="same-as-shipping" className="text-sm cursor-pointer">
                      Same as shipping
                    </Label>
                  </div>
                </div>
                
                {!sameAsBilling && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label className="text-sm mb-2 block">Full Name</Label>
                      <Input
                        value={billingAddress.name}
                        onChange={(e) => updateBilling({ name: e.target.value })}
                        placeholder="Billing name"
                        required={!sameAsBilling}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-sm mb-2 block">Street Address</Label>
                      <Input
                        value={billingAddress.address}
                        onChange={(e) => updateBilling({ address: e.target.value })}
                        placeholder="123 Main St"
                        required={!sameAsBilling}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">City</Label>
                      <Input
                        value={billingAddress.city}
                        onChange={(e) => updateBilling({ city: e.target.value })}
                        required={!sameAsBilling}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">State</Label>
                      <Input
                        value={billingAddress.state}
                        onChange={(e) => updateBilling({ state: e.target.value })}
                        required={!sameAsBilling}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">ZIP Code</Label>
                      <Input
                        value={billingAddress.zip}
                        onChange={(e) => updateBilling({ zip: e.target.value })}
                        required={!sameAsBilling}
                      />
                    </div>
                    <div>
                      <Label className="text-sm mb-2 block">Country</Label>
                      <Input
                        value={billingAddress.country}
                        onChange={(e) => updateBilling({ country: e.target.value })}
                        required={!sameAsBilling}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Payment (only if not proof first) */}
            {!proofFirst && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 border rounded-2xl space-y-4"
              >
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="w-5 h-5" /> Payment Method
                </Label>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label className="text-sm mb-2 block">Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      required={!proofFirst}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">Expiry Date</Label>
                    <Input
                      placeholder="MM/YY"
                      required={!proofFirst}
                    />
                  </div>
                  <div>
                    <Label className="text-sm mb-2 block">CVC</Label>
                    <Input
                      placeholder="123"
                      required={!proofFirst}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </motion.div>
            )}

            {/* Order Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 border rounded-2xl space-y-4"
            >
              <Label className="text-lg font-semibold">Order Notes</Label>
              
              <div>
                <Label className="text-sm mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Need By Date
                </Label>
                <Input
                  type="date"
                  value={needByDate}
                  onChange={(e) => dispatch({ type: 'SET_NEED_BY_DATE', date: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm mb-2 block">Special Instructions</Label>
                <Textarea
                  value={specialInstructions}
                  onChange={(e) => dispatch({ type: 'SET_SPECIAL_INSTRUCTIONS', instructions: e.target.value })}
                  placeholder="Any special requests or notes for your order..."
                  rows={4}
                />
              </div>
            </motion.div>

            {/* Terms Acceptance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="p-4 border rounded-xl"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  id="accept-terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-0.5"
                />
                <Label htmlFor="accept-terms" className="text-sm cursor-pointer">
                  I agree to the Terms of Service and Privacy Policy. I understand that custom orders are final and non-refundable once approved and sent to production.
                </Label>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24 p-6 bg-muted rounded-2xl space-y-4"
            >
              <Label className="text-sm font-semibold">Order Summary</Label>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                
                {totals.addOnFees > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span>+${totals.addOnFees.toFixed(2)}</span>
                  </div>
                )}
                
                {totals.rushFee > 0 && (
                  <div className="flex justify-between text-yellow-600">
                    <span>Rush Fee</span>
                    <span>+${totals.rushFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${totals.estimatedShipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${totals.estimatedTax.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>

              <Button 
                type="submit"
                size="lg" 
                className="w-full"
                disabled={isSubmitting || !acceptTerms}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : proofFirst 
                    ? 'Submit Proof Request' 
                    : 'Place Order'
                }
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                {proofFirst 
                  ? "We'll send your design proof within 24-48 hours for your review."
                  : "By placing your order, you agree to our Terms of Service and Privacy Policy."
                }
              </p>
            </motion.div>
          </div>
        </div>
      </form>
    </div>
  );
}
