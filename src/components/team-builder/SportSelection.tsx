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
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectSport(sport.id)}
            className="group relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Full Color Image */}
            <img
              src={sport.image}
              alt={sport.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Elegant gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
            
            {/* Decorative top accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6">
              {/* Glassmorphism card */}
              <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-lg md:text-xl font-bold text-white text-center tracking-wide">
                  {sport.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-white/80 text-xs md:text-sm mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <span className="font-medium">Get Started</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}