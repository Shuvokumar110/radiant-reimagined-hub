import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandStorySection } from "@/components/home/BrandStorySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { SoccerBootsSection } from "@/components/home/SoccerBootsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AffiliatesSection } from "@/components/home/AffiliatesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BrandStorySection />
      <ProcessSection />
      <SoccerBootsSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <AffiliatesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
