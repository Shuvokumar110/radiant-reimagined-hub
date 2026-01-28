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

function TeamBuilderContent() {
  const { state } = useTeamBuilder();
  const { currentStep } = state;

  const renderStep = () => {
    switch (currentStep) {
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
      <div className="min-h-screen bg-background pt-24 md:pt-32 pb-16">
        {/* Step Indicator - show after sport selection */}
        {currentStep > 0 && (
          <div className="border-b border-border mb-8">
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
              <StepIndicator />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24">
          {renderStep()}
        </div>
      </div>
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
