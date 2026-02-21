import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
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

// Keep boots images from existing products
import style672 from "@/assets/products/style-672-4.png";
import style972 from "@/assets/products/style-972-1.png";
import giveAKick from "@/assets/products/give-a-kick-to-racism-1.png";

const CATALOG_LINK = "https://drive.google.com/file/d/1V4FtVVC8s1QgytQwGWUlc42flUWOhUM-/view?usp=drivesdk";

interface ShopCategory {
  id: string;
  name: string;
  image: string;
  link: string;
}

const categories: ShopCategory[] = [
  { id: "soccer", name: "Soccer", image: soccerImg, link: CATALOG_LINK },
  { id: "basketball", name: "Basketball", image: basketballImg, link: CATALOG_LINK },
  { id: "american-football", name: "American Football", image: americanFootballImg, link: CATALOG_LINK },
  { id: "baseball-softball", name: "Baseball/Softball", image: soccerImg, link: CATALOG_LINK }, // Using soccer as placeholder
  { id: "volleyball", name: "Volleyball", image: volleyballImg, link: CATALOG_LINK },
  { id: "netball", name: "Netball", image: netballImg, link: CATALOG_LINK },
  { id: "cricket", name: "Cricket", image: cricketImg, link: CATALOG_LINK },
  { id: "tracksuits", name: "Tracksuits", image: tracksuitImg, link: CATALOG_LINK },
  { id: "hoodies", name: "Hoodies", image: hoodiesImg, link: CATALOG_LINK },
  { id: "polo-jerseys", name: "Polo Jerseys", image: poloImg, link: CATALOG_LINK },
  { id: "sports-jersey", name: "Sports Jersey", image: sportsJerseyImg, link: CATALOG_LINK },
];

const bootProducts = [
  { id: 1, name: "Soccer Boots – Style 672", image: style672, slug: "style-672" },
  { id: 2, name: "Soccer Boots – Style 972", image: style972, slug: "style-972" },
  { id: 3, name: "Give A Kick To Racism", image: giveAKick, slug: "give-a-kick-to-racism" },
];

export default function Shop() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Premium Collection
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Shop.</span>
              <br />
              <span className="text-background/50">Gear Up.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 max-w-2xl mt-6 text-lg">
              High-performance gear tailored for clubs, academies, leagues, federations, and organizations.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              <span className="text-foreground">Browse</span>{" "}
              <span className="text-muted-foreground">Categories</span>
            </h2>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <a
                  href={category.link}
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
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* External Link Indicator */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-4 h-4 text-foreground" />
                      </div>
                      
                      {/* Category Name */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-lg text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Boots Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              <span className="text-foreground">Premium</span>{" "}
              <span className="text-muted-foreground">Soccer Boots</span>
            </h2>
            <p className="text-muted-foreground mb-8">Made in Italy with premium leather</p>
          </FadeInUp>

          {/* Team Order Notice */}
          <FadeInUp delay={0.1}>
            <div className="bg-foreground text-background rounded-xl p-4 md:p-6 mb-8">
              <p className="text-center font-medium">
                Contact Support for Team Orders
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bootProducts.map((product) => (
              <StaggerItem key={product.id}>
                <Link to={`/shop/${product.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      
                      {/* Tags */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2 py-1 bg-foreground text-background text-xs font-medium rounded">
                          Made in Italy
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        Soccer Boots
                      </span>
                      <h3 className="font-semibold text-base mt-1 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm font-medium text-primary">
                        Contact for Team Pricing
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Custom Orders
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">Need Custom.</span>
              <br />
              <span className="text-muted-foreground">Team Orders?</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for bulk team orders, custom designs, and special pricing.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Request a Quote
            </Link>
          </FadeInUp>
        </div>
      </section>
    </Layout>
  );
}
