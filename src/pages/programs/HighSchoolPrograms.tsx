import { ProgramPageTemplate } from "@/components/programs/ProgramPageTemplate";
import { Palette, Shield, Users } from "lucide-react";

export default function HighSchoolPrograms() {
  return (
    <ProgramPageTemplate
      title="Pride On and Off the Field"
      subtitle="High School Programs"
      description="Outfit your high school athletes with premium custom gear that builds team unity and school pride. From varsity to JV, we provide complete solutions for every level."
      heroImage="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000"
      highlights={[
        {
          icon: <Palette className="h-6 w-6" />,
          title: "School Colors",
          description: "Custom designs featuring your exact school colors and logos for a unified team look.",
        },
        {
          icon: <Shield className="h-6 w-6" />,
          title: "Durable Fabrics",
          description: "Built to withstand intense training and multiple seasons of competitive play.",
        },
        {
          icon: <Users className="h-6 w-6" />,
          title: "Bulk Ordering",
          description: "Special pricing for large team orders with easy size management.",
        },
      ]}
      outfitSolutions={[
        { name: "Jerseys", image: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?q=80&w=400" },
        { name: "Shorts", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400" },
        { name: "Training Gear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400" },
        { name: "Accessories", image: "https://images.unsplash.com/photo-1585149043856-1c8de32fdf08?q=80&w=400" },
      ]}
      benefits={[
        { title: "Fast Turnaround", description: "Quick production times to meet your season deadlines." },
        { title: "Dedicated Support", description: "Personal account manager for seamless ordering experience." },
        { title: "Size Exchanges", description: "Easy size exchange policy for perfect fit." },
        { title: "Reorder Simplicity", description: "Quick reorders for new players and replacements." },
        { title: "Quality Guarantee", description: "Premium materials backed by our satisfaction guarantee." },
        { title: "Custom Designs", description: "Work with our designers to create unique team looks." },
      ]}
    />
  );
}
