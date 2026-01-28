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
      {/* Hero Section */}
      <div className="text-center mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Team Builder
            </span>
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
        >
          <span className="text-foreground">Build Your</span>{" "}
          <span className="text-muted-foreground">Team Look</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto px-4"
        >
          Design custom uniforms for your team. Choose your sport to get started.
        </motion.p>
      </div>

      {/* Sport Selection Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {sportCategories.map((sport, index) => (
          <motion.button
            key={sport.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 * index }}
            onClick={() => handleSelectSport(sport.id)}
            className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border hover:border-foreground/20 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Hover indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-foreground" />
              </div>
            </div>

            {/* Text Content */}
            <div className="p-4 md:p-5 bg-card">
              <h3 className="text-base md:text-lg font-semibold text-foreground text-center group-hover:text-primary transition-colors duration-300">
                {sport.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Customize Now
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
