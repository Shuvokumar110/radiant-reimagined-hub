import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ElevateSection } from "@/components/home/ElevateSection";
import { SoccerBootsSection } from "@/components/home/SoccerBootsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { BestSellingSection } from "@/components/home/BestSellingSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { TeamNeedsSection } from "@/components/home/TeamNeedsSection";
import { AffiliatesSection } from "@/components/home/AffiliatesSection";
import { GearUpSection } from "@/components/home/GearUpSection";
import { ContactBarSection } from "@/components/home/ContactBarSection";
import { Preloader } from "@/components/ui/Preloader";
import { useState } from "react";
import { motion } from "framer-motion";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setShowContent(true)} />
      
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Layout>
            <HeroSection />
            <ElevateSection />
            <SoccerBootsSection />
            <ProcessSection />
            <BestSellingSection />
            <LocationsSection />
            <TeamNeedsSection />
            <AffiliatesSection />
            <GearUpSection />
            <ContactBarSection />
          </Layout>
        </motion.div>
      )}
    </>
  );
};

export default Index;
