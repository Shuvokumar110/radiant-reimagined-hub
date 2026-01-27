import { ProgramPageTemplate } from "@/components/programs/ProgramPageTemplate";
import { Users, MapPin, Star } from "lucide-react";

export default function ClubTravel() {
  return (
    <ProgramPageTemplate
      title="Compete with Confidence"
      subtitle="Club & Travel Teams"
      description="Stand out at every tournament with professional-grade custom gear. We understand the competitive club scene and deliver quality that matches your team's ambition."
      heroImage="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2000"
      highlights={[
        {
          icon: <Users className="h-6 w-6" />,
          title: "Team Unity",
          description: "Cohesive designs that strengthen team identity and pride.",
        },
        {
          icon: <MapPin className="h-6 w-6" />,
          title: "Tournament Ready",
          description: "Professional appearance for showcases and championships.",
        },
        {
          icon: <Star className="h-6 w-6" />,
          title: "Premium Quality",
          description: "Gear that performs as hard as your athletes do.",
        },
      ]}
      outfitSolutions={[
        { name: "Match Kits", image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=400" },
        { name: "Training Sets", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400" },
        { name: "Warm-Up Gear", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882b68?q=80&w=400" },
        { name: "Team Bags", image: "https://images.unsplash.com/photo-1585149043856-1c8de32fdf08?q=80&w=400" },
      ]}
      benefits={[
        { title: "Club Discounts", description: "Special pricing tiers for registered club teams." },
        { title: "Season Planning", description: "Plan ahead with pre-season ordering schedules." },
        { title: "Tryout Packages", description: "Sample sizes available for new player tryouts." },
        { title: "Parent Portal", description: "Easy online ordering for team families." },
        { title: "Quick Replacements", description: "Fast turnaround on replacement orders." },
        { title: "Age Group Sizing", description: "Comprehensive sizing from youth to adult." },
      ]}
    />
  );
}
