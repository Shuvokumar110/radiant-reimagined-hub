import { motion } from "framer-motion";

import talladegaLogo from "@/assets/affiliates/talladega-college.png";
import shenenLogo from "@/assets/affiliates/shenen-africa.png";
import nycIntercolLogo from "@/assets/affiliates/nyc-intercol.png";
import flyingFishLogo from "@/assets/affiliates/flying-fish.png";
import { useFadeIn, useStaggerFadeIn } from "@/hooks/useGSAPAnimations";

const affiliates = [
  { name: "Talladega College Tornadoes", logo: talladegaLogo },
  { name: "Shenen Africa", logo: shenenLogo },
  { name: "NYC Intercol Tournament", logo: nycIntercolLogo },
  { name: "Flying Fish Swim Club Trinidad", logo: flyingFishLogo },
];

const duplicatedAffiliates = [...affiliates, ...affiliates, ...affiliates];

const stats = [
  { value: "500+", label: "Teams Served" },
  { value: "50+", label: "Countries" },
  { value: "15+", label: "Years Experience" },
];

export function AffiliatesSection() {
  const headerRef = useFadeIn(0);
  const statsRef = useStaggerFadeIn(0.1);

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Trusted Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Our Partners.</span>
            <br />
            <span className="text-muted-foreground">Trusted Globally.</span>
          </h2>
        </div>

        {/* Stats Row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-4 md:flex md:flex-wrap md:justify-center md:gap-16 mb-10 md:mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground block">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border max-w-2xl mx-auto mb-10 md:mb-16" />
      </div>

      {/* Infinite Logo Marquee - Keep this animation as it's essential */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 sm:gap-6 md:gap-12"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ x: { duration: 25, repeat: Infinity, ease: "linear" } }}
        >
          {duplicatedAffiliates.map((affiliate, index) => (
            <div key={`${affiliate.name}-${index}`} className="flex-shrink-0 group">
              <div className="bg-background border border-border/50 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 shadow-sm hover:shadow-lg hover:border-border transition-all duration-300">
                <img
                  src={affiliate.logo}
                  alt={affiliate.name}
                  className="h-10 sm:h-14 md:h-20 w-auto object-contain transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA Text */}
      <div className="text-center mt-16 px-8">
        <p className="text-muted-foreground text-sm md:text-base">
          Join the growing list of teams and organizations that trust TiDi for their apparel needs.
        </p>
      </div>
    </section>
  );
}
