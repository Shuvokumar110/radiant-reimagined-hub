import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

// Import gallery images
import team1 from "@/assets/gallery/team-1.png";
import team2 from "@/assets/gallery/team-2.png";
import team3 from "@/assets/gallery/team-3.png";
import team4 from "@/assets/gallery/team-4.png";
import team5 from "@/assets/gallery/team-5.png";
import team6 from "@/assets/gallery/team-6.png";
import team7 from "@/assets/gallery/team-7.png";
import team8 from "@/assets/gallery/team-8.png";
import team9 from "@/assets/gallery/team-9.png";
import team10 from "@/assets/gallery/team-10.png";
import team11 from "@/assets/gallery/team-11.png";

const galleryImages = [
  { id: 1, src: team1, title: "DNC Academy Seniors", category: "Team" },
  { id: 2, src: team2, title: "Valvoline Youth Academy", category: "Academy" },
  { id: 3, src: team3, title: "DNC Junior Squad", category: "Youth" },
  { id: 4, src: team4, title: "Green & White United", category: "Team" },
  { id: 5, src: team5, title: "DNC Red Squad", category: "Team" },
  { id: 6, src: team6, title: "Youth Training Session", category: "Training" },
  { id: 7, src: team7, title: "Powerade Youth Team", category: "Youth" },
  { id: 8, src: team8, title: "DNC Match Day", category: "Match Day" },
  { id: 9, src: team9, title: "Junior Champions", category: "Youth" },
  { id: 10, src: team10, title: "Game Day Lineup", category: "Match Day" },
  { id: 11, src: team11, title: "Youth Celebration", category: "Youth" },
];

const categories = ["All", "Team", "Youth", "Academy", "Match Day", "Training"];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const currentIndex = selectedImage !== null
    ? filteredImages.findIndex((img) => img.id === selectedImage)
    : -1;

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1].id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "Escape") setSelectedImage(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Our Teams in Action
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Gallery.</span>
              <br />
              <span className="text-background/50">Moments Captured.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 max-w-xl mt-6">
              Celebrating the teams we've had the honor of outfitting. See our custom 
              apparel in action on pitches around the world.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background border-b border-border py-3 md:py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredImages.map((image) => (
              <StaggerItem key={image.id}>
                <motion.div
                  layoutId={`image-${image.id}`}
                  onClick={() => setSelectedImage(image.id)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
                  >
                    <div>
                      <span className="text-xs text-white/70 uppercase tracking-wider">
                        {image.category}
                      </span>
                      <h3 className="text-white font-semibold text-lg mt-1">
                        {image.title}
                      </h3>
                    </div>
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 text-white/70 hover:text-white z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-8 w-8" />
            </motion.button>

            {/* Navigation */}
            {currentIndex > 0 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute left-4 md:left-8 text-white/70 hover:text-white z-10 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
              >
                <ChevronLeft className="h-10 w-10" />
              </motion.button>
            )}

            {currentIndex < filteredImages.length - 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-4 md:right-8 text-white/70 hover:text-white z-10 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight className="h-10 w-10" />
              </motion.button>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[currentIndex]?.src}
                alt={filteredImages[currentIndex]?.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <h3 className="text-white font-semibold text-xl">
                  {filteredImages[currentIndex]?.title}
                </h3>
                <p className="text-white/60 text-sm mt-1">
                  {currentIndex + 1} of {filteredImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
