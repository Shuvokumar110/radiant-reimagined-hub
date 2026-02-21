import { Link } from "react-router-dom";
import { useFadeIn } from "@/hooks/useGSAPAnimations";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TeamBuilderSection() {
  const sectionRef = useFadeIn(0);

  return (
    <section className="py-16 md:py-24 bg-foreground text-background overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-background rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-background/60">
              Team Builder
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-background">Design Your</span>{" "}
            <span className="text-background/50">Custom Outfit</span>
          </h2>
          <p className="text-background/70 text-sm md:text-lg mb-8 max-w-2xl mx-auto">
            Build fully custom uniforms for your team — choose your sport, style, colors, and add your roster.
          </p>
          <Link to="/custom-outfit">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 gap-2">
              Start Building <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
