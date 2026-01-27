import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/ui/animated-text";

const videos = [
  {
    id: 1,
    title: "Team Championship Highlights",
    category: "Highlights",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Custom Jersey Production",
    category: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Soccer Boot Technology",
    category: "Product Showcase",
    thumbnail: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Training Session with Pros",
    category: "Training",
    thumbnail: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Customer Testimonials",
    category: "Testimonials",
    thumbnail: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Factory Tour",
    category: "Behind the Scenes",
    thumbnail: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const filteredVideos =
    activeCategory === "All"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/10 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-background rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-background/70">
                Media
              </span>
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-background">Video.</span>
              <br />
              <span className="text-background/50">Gallery.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-background/70 mt-6 max-w-xl">
              Watch our latest videos featuring product showcases, behind-the-scenes content, and team highlights.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-[72px] z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <StaggerItem key={video.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-luxury transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-background rounded-full flex items-center justify-center"
                      >
                        <Play className="h-6 w-6 text-foreground ml-1" fill="currentColor" />
                      </motion.div>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
                        {video.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg">{video.title}</h3>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-12 right-0 text-background hover:text-background/70 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
