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
      <div className="text-center mb-8 md:mb-12">
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

      {/* Sport Selection Grid - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6"
      >
        {sportCategories.map((sport, index) => (
          <motion.button
            key={sport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * index }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectSport(sport.id)}
            className="group relative aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Full Color Image */}
            <img
              src={sport.image}
              alt={sport.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Minimal gradient for text legibility - preserves original image colors */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-3 md:p-4">
              <h3 className="text-base md:text-lg font-bold text-white text-center mb-1">
                {sport.name}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Select</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}