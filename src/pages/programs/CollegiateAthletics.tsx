import { ProgramPageTemplate } from "@/components/programs/ProgramPageTemplate";
import { Trophy, Zap, Award } from "lucide-react";

export default function CollegiateAthletics() {
  return (
    <ProgramPageTemplate
      title="Elevate Your Athletic Program"
      subtitle="Collegiate Athletics"
      description="Premium athletic wear for university and college programs. Meet NCAA standards while standing out with custom designs that represent your institution's excellence."
      heroImage="https://images.unsplash.com/photo-1461896836934- voices?q=80&w=2000"
      highlights={[
        {
          icon: <Trophy className="h-6 w-6" />,
          title: "Championship Quality",
          description: "Performance gear designed for elite collegiate competition.",
        },
        {
          icon: <Zap className="h-6 w-6" />,
          title: "Performance Tech",
          description: "Advanced moisture-wicking and temperature regulation fabrics.",
        },
        {
          icon: <Award className="h-6 w-6" />,
          title: "NCAA Compliant",
          description: "All products meet NCAA equipment standards and regulations.",
        },
      ]}
      outfitSolutions={[
        { name: "Game Day Kits", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
        { name: "Practice Wear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400" },
        { name: "Travel Gear", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882b68?q=80&w=400" },
        { name: "Fan Merchandise", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=400" },
      ]}
      benefits={[
        { title: "Program Partnerships", description: "Long-term partnerships with dedicated pricing and support." },
        { title: "Rush Orders", description: "Express production for tournament and playoff needs." },
        { title: "Athlete Sizing", description: "Custom fitting sessions available for your roster." },
        { title: "Multi-Sport Discounts", description: "Bundle pricing across multiple athletic programs." },
        { title: "Brand Consistency", description: "Unified look across all your athletic programs." },
        { title: "Alumni Collections", description: "Special collections for alumni and fan gear." },
      ]}
    />
  );
}
