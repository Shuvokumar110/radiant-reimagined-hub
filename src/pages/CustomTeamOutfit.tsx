import { Layout } from "@/components/layout/Layout";
import { TeamBuilderProvider, useTeamBuilder } from "@/context/TeamBuilderContext";
import { StepIndicator } from "@/components/team-builder/StepIndicator";
import { SportSelection } from "@/components/team-builder/SportSelection";
import { ProductSelection } from "@/components/team-builder/ProductSelection";
import { StyleOptions } from "@/components/team-builder/StyleOptions";
import { DesignBuilder } from "@/components/team-builder/DesignBuilder";
import { RosterBuilder } from "@/components/team-builder/RosterBuilder";
import { OrderReview } from "@/components/team-builder/OrderReview";
import { Checkout } from "@/components/team-builder/Checkout";
import { motion, AnimatePresence } from "framer-motion";

function TeamBuilderContent() {
  const { state } = useTeamBuilder();

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <SportSelection />;
      case 1:
        return <ProductSelection />;
      case 2:
        return <StyleOptions />;
      case 3:
        return <DesignBuilder />;
      case 4:
        return <RosterBuilder />;
      case 5:
        return <OrderReview />;
      case 6:
        return <Checkout />;
      default:
        return <SportSelection />;
    }
  };

  return (
    <Layout>
      {/* Hero Section - Reduced padding on mobile */}
      <section className="pt-24 md:pt-32 pb-4 md:pb-8 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              <span className="text-background">Custom.</span>{" "}
              <span className="text-background/50">Team Outfits.</span>
            </h1>
            <p className="text-background/70 max-w-2xl mx-auto text-sm md:text-lg">
              Create custom designed performance outfits that represent your club, academy, league, or organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="sticky top-16 md:top-20 z-40 bg-background border-b border-border py-3 md:py-4">
        <div className="container mx-auto px-3 sm:px-6">
          <StepIndicator />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 md:py-12 bg-background min-h-[60vh]">
        <div className="container mx-auto px-3 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
}

export default function CustomTeamOutfit() {
  return (
    <TeamBuilderProvider>
      <TeamBuilderContent />
    </TeamBuilderProvider>
  );
}
