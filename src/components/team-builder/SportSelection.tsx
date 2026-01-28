import { motion } from "framer-motion";
import { ArrowRight, Users, Palette, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
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
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          <span className="text-foreground">Build Your</span>{" "}
          <span className="text-muted-foreground">Team Look</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Design custom uniforms for your team. Choose your sport to get started.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button size="lg" className="gap-2">
            <Users className="w-4 h-4" />
            Start Team Order
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Palette className="w-4 h-4" />
            Build Your Design
          </Button>
          <Button size="lg" variant="ghost" className="gap-2">
            <FileText className="w-4 h-4" />
            Request Quote
          </Button>
        </motion.div>
      </div>

      {/* Sport Selection Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {sportCategories.map((sport, index) => (
          <motion.button
            key={sport.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectSport(sport.id)}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-foreground shadow-elegant hover:shadow-luxury transition-all"
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 md:p-6">
              <span className="text-3xl md:text-4xl mb-2">{sport.icon}</span>
              <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
                {sport.name}
              </h3>
              <div className="flex items-center gap-1 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Select</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
