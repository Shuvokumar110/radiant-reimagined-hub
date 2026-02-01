import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

// Category Images
import soccerImg from "@/assets/categories/soccer.png";
import basketballImg from "@/assets/categories/basketball.png";
import americanFootballImg from "@/assets/categories/american-football.png";
import cricketImg from "@/assets/categories/cricket.png";
import volleyballImg from "@/assets/categories/volleyball.png";
import netballImg from "@/assets/categories/netball.png";
import tracksuitImg from "@/assets/categories/tracksuits.png";
import hoodiesImg from "@/assets/categories/hoodies.png";
import poloImg from "@/assets/categories/polo-jerseys.png";
import sportsJerseyImg from "@/assets/categories/sports-jersey.png";
import businessImg from "@/assets/team-builder/sport-business.jpg";

const CATALOG_LINK = "https://drive.google.com/file/d/1V4FtVVC8s1QgytQwGWUlc42flUWOhUM-/view?usp=drivesdk";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
  subcategories?: Category[];
}

const sportsCategories: Category[] = [
  { id: "soccer", name: "Soccer", image: soccerImg, link: CATALOG_LINK },
  { id: "basketball", name: "Basketball", image: basketballImg, link: CATALOG_LINK },
  { id: "american-football", name: "American Football", image: americanFootballImg, link: CATALOG_LINK },
  { id: "baseball-softball", name: "Baseball/Softball", image: soccerImg, link: CATALOG_LINK },
  { id: "volleyball", name: "Volleyball", image: volleyballImg, link: CATALOG_LINK },
  { id: "netball", name: "Netball", image: netballImg, link: CATALOG_LINK },
  { id: "cricket", name: "Cricket", image: cricketImg, link: CATALOG_LINK },
  { 
    id: "business", 
    name: "Business", 
    image: businessImg, 
    link: CATALOG_LINK,
    subcategories: [
      { id: "tracksuits", name: "Tracksuits", image: tracksuitImg, link: CATALOG_LINK },
      { id: "hoodies", name: "Hoodies", image: hoodiesImg, link: CATALOG_LINK },
      { id: "polo-jerseys", name: "Polo Jerseys", image: poloImg, link: CATALOG_LINK },
      { id: "sports-jersey", name: "Sports Jersey", image: sportsJerseyImg, link: CATALOG_LINK },
    ]
  },
];

function CategoryCard({ category, onClick }: { category: Category; onClick?: () => void }) {
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  
  const CardContent = (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500 border border-border cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Icon Indicator */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {hasSubcategories ? (
            <ChevronDown className="w-4 h-4 text-foreground" />
          ) : (
            <ExternalLink className="w-4 h-4 text-foreground" />
          )}
        </div>
        
        {/* Category Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            {category.name}
            {hasSubcategories && <ChevronDown className="w-4 h-4" />}
          </h3>
        </div>
      </div>
    </motion.div>
  );

  if (hasSubcategories && onClick) {
    return (
      <div className="group" onClick={onClick}>
        {CardContent}
      </div>
    );
  }

  return (
    <a
      href={category.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {CardContent}
    </a>
  );
}

export default function CustomTeamOutfit() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const businessCategory = sportsCategories.find(c => c.id === "business");

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Custom Outfits
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Custom.</span>
              <br />
              <span className="text-background/50">Team Outfits.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 max-w-2xl mt-6 text-lg">
              Create custom designed performance outfits that represent your club, academy, league, or organization.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="text-foreground">Select Your</span>{" "}
              <span className="text-muted-foreground">Sport</span>
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sportsCategories.map((category) => (
              <StaggerItem key={category.id}>
                <CategoryCard 
                  category={category}
                  onClick={category.subcategories ? () => handleCategoryClick(category.id) : undefined}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Business Subcategories */}
          <AnimatePresence>
            {expandedCategory === "business" && businessCategory?.subcategories && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <FadeInUp>
                  <h3 className="text-xl md:text-2xl font-bold mb-6">
                    <span className="text-foreground">Business</span>{" "}
                    <span className="text-muted-foreground">Apparel</span>
                  </h3>
                </FadeInUp>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {businessCategory.subcategories.map((subcat, index) => (
                    <motion.div
                      key={subcat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={subcat.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <motion.div
                          whileHover={{ y: -8 }}
                          className="relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500 border border-border"
                        >
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <motion.img
                              src={subcat.image}
                              alt={subcat.name}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ExternalLink className="w-4 h-4 text-foreground" />
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-bold text-lg text-white">
                                {subcat.name}
                              </h3>
                            </div>
                          </div>
                        </motion.div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Get Started
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Ready to</span>{" "}
              <span className="text-muted-foreground">Design?</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our team to discuss your custom outfit requirements and get a personalized quote.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Contact Us
            </a>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
