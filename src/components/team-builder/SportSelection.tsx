import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTeamBuilder } from "@/context/TeamBuilderContext";
import { sportCategories, SportType } from "@/data/teamBuilderData";

export function SportSelection() {
  const { dispatch } = useTeamBuilder();

  const handleSelectSport = (sportId: SportType) => {
    dispatch({ type: 'SET_SPORT', sport: sportId });
  };

  return (
    <div className="w-full">
      {/* Hero Section - Compact on mobile */}
      <div className="text-center mb-6 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-muted rounded-full mb-3 md:mb-6">
            <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-foreground rounded-full" />
            <span className="text-[10px] md:text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Team Builder
            </span>
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4"
        >
          <span className="text-foreground">Build Your</span>{" "}
          <span className="text-muted-foreground">Team Look</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm md:text-lg text-muted-foreground max-w-xl mx-auto px-2"
        >
          Choose your sport to get started
        </motion.p>
      </div>

      {/* Sport Selection Grid - 3 columns on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-4 md:gap-6"
      >
        {sportCategories.map((sport, index) => (
          <motion.button
            key={sport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            onClick={() => handleSelectSport(sport.id)}
            className="group relative flex flex-col bg-card rounded-lg md:rounded-2xl overflow-hidden border border-border active:border-foreground/30 md:hover:border-foreground/20 shadow-sm active:shadow-md md:hover:shadow-xl transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.02]"
          >
            {/* Image Container - Taller ratio on mobile for better visuals */}
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-110"
              />
              
              {/* Mobile: Always visible subtle overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:from-black/30 md:via-transparent md:to-black/10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Desktop only: Hover arrow indicator */}
              <div className="hidden md:flex absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </div>
            </div>

            {/* Text Content - Compact on mobile */}
            <div className="p-1.5 sm:p-2.5 md:p-5 bg-card">
              <div className="flex items-center justify-between md:justify-center">
                <h3 className="text-[11px] sm:text-sm md:text-lg font-semibold text-foreground md:text-center group-active:text-primary md:group-hover:text-primary transition-colors duration-300 truncate">
                  {sport.name}
                </h3>
                
                {/* Mobile: Always visible arrow */}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground group-active:text-primary md:hidden transition-colors flex-shrink-0 ml-1" />
              </div>
              
              {/* Desktop: Hover text */}
              <p className="hidden md:block text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Customize Now
              </p>
            </div>

            {/* Bottom accent line - Desktop only */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
