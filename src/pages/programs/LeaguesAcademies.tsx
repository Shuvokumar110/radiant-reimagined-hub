import { ProgramPageTemplate } from "@/components/programs/ProgramPageTemplate";
import { BookOpen, Globe, Heart } from "lucide-react";

export default function LeaguesAcademies() {
  return (
    <ProgramPageTemplate
      title="Building Tomorrow's Champions"
      subtitle="Leagues & Academies"
      description="Partner with TiDi Apparel to outfit your entire league or academy. From recreational leagues to elite training academies, we provide scalable solutions for organizations of all sizes."
      heroImage="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=2000"
      highlights={[
        {
          icon: <BookOpen className="h-6 w-6" />,
          title: "Academy Standards",
          description: "Professional-grade gear for developing athletes of all ages.",
        },
        {
          icon: <Globe className="h-6 w-6" />,
          title: "League-Wide Solutions",
          description: "Consistent quality and pricing across all teams in your organization.",
        },
        {
          icon: <Heart className="h-6 w-6" />,
          title: "Youth Development",
          description: "Age-appropriate designs and sizing for growing athletes.",
        },
      ]}
      outfitSolutions={[
        { name: "League Uniforms", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
        { name: "Academy Kits", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400" },
        { name: "Coach Apparel", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882b68?q=80&w=400" },
        { name: "Referee Gear", image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=400" },
      ]}
      benefits={[
        { title: "Volume Pricing", description: "Significant discounts for league-wide orders." },
        { title: "Multi-Team Management", description: "Easy ordering system for multiple teams." },
        { title: "Seasonal Contracts", description: "Lock in pricing with seasonal agreements." },
        { title: "Design Consistency", description: "Unified look across your entire organization." },
        { title: "Inventory Management", description: "Stock management solutions for league stores." },
        { title: "Growth Support", description: "Flexible ordering as your organization expands." },
      ]}
    />
  );
}
