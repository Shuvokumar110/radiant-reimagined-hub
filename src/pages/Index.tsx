import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ElevateSection } from "@/components/home/ElevateSection";
import { SoccerBootsSection } from "@/components/home/SoccerBootsSection";
import { BestSellingSection } from "@/components/home/BestSellingSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { TeamNeedsSection } from "@/components/home/TeamNeedsSection";
import { AffiliatesSection } from "@/components/home/AffiliatesSection";
import { GearUpSection } from "@/components/home/GearUpSection";
import { ContactBarSection } from "@/components/home/ContactBarSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ElevateSection />
      <SoccerBootsSection />
      <BestSellingSection />
      <LocationsSection />
      <TeamNeedsSection />
      <AffiliatesSection />
      <GearUpSection />
      <ContactBarSection />
    </Layout>
  );
};

export default Index;
