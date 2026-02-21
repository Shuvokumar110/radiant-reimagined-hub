import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { TeamBuilderProvider, useTeamBuilder } from "@/context/TeamBuilderContext";
import { StepIndicator } from "@/components/team-builder/StepIndicator";
import { SportSelection } from "@/components/team-builder/SportSelection";
import { ProductSelection } from "@/components/team-builder/ProductSelection";
import { StyleOptions } from "@/components/team-builder/StyleOptions";
import { RosterBuilder } from "@/components/team-builder/RosterBuilder";
import { OrderReview } from "@/components/team-builder/OrderReview";
import { Checkout } from "@/components/team-builder/Checkout";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useDraftOrders, DraftOrder } from "@/hooks/useDraftOrders";
import { Button } from "@/components/ui/button";
import { Save, FolderOpen, Trash2, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SaveLoadBar() {
  const { user } = useAuth();
  const { state, dispatch } = useTeamBuilder();
  const { drafts, loading, fetchDrafts, saveDraft, deleteDraft } = useDraftOrders();
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  useEffect(() => {
    if (user) fetchDrafts();
  }, [user]);

  const handleSave = async () => {
    const id = await saveDraft(state, currentDraftId || undefined);
    if (id) setCurrentDraftId(id);
  };

  const handleLoad = (draft: DraftOrder) => {
    dispatch({ type: 'LOAD_STATE', state: draft.state });
    setCurrentDraftId(draft.id);
    setLoadDialogOpen(false);
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <LogIn className="w-3.5 h-3.5" />
        <Link to="/account" className="underline hover:text-foreground transition-colors">
          Sign in to save your progress
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleSave} className="gap-1.5 text-xs">
        <Save className="w-3.5 h-3.5" />
        {currentDraftId ? 'Save' : 'Save Draft'}
      </Button>

      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => fetchDrafts()}>
            <FolderOpen className="w-3.5 h-3.5" />
            Load Draft
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your Saved Drafts</DialogTitle>
          </DialogHeader>
          {loading ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Loading...</p>
          ) : drafts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">No saved drafts yet.</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {drafts.map((draft) => (
                <div key={draft.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <button onClick={() => handleLoad(draft)} className="flex-1 text-left">
                    <p className="text-sm font-medium">{draft.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(draft.updated_at).toLocaleDateString()}
                    </p>
                  </button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteDraft(draft.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {currentDraftId && (
        <span className="text-[10px] text-muted-foreground">Draft saved</span>
      )}
    </div>
  );
}

function TeamBuilderContent() {
  const { state } = useTeamBuilder();

  const renderStep = () => {
    switch (state.currentStep) {
      case 0: return <SportSelection />;
      case 1: return <ProductSelection />;
      case 2: return <StyleOptions />;
      case 3: return <RosterBuilder />;
      case 4: return <OrderReview />;
      case 5: return <Checkout />;
      default: return <SportSelection />;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
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
            <p className="text-background/50 text-xs md:text-sm mt-2">
              All products are sublimated apparel — fully customized, dye-sublimated uniforms
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step Indicator + Save/Load */}
      <section className="sticky top-16 md:top-20 z-40 bg-background border-b border-border py-3 md:py-4">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 overflow-hidden">
              <StepIndicator />
            </div>
            <div className="shrink-0 hidden sm:block">
              <SaveLoadBar />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Save Bar */}
      <section className="sm:hidden bg-background border-b border-border px-3 py-2">
        <SaveLoadBar />
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
