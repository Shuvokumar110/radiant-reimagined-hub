import { ChevronLeft, ChevronRight, Award, Globe, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

import heroAthlete from "@/assets/hero-athlete.jpg";
import heroSlide2 from "@/assets/hero-slide-2.png";
import heroSlide3 from "@/assets/hero-slide-3.png";
import { useFadeIn, useStaggerFadeIn } from "@/hooks/useGSAPAnimations";

const slides = [
  { image: heroAthlete, title: "PLAY BOLD.", subtitle: "LOOK BOLD." },
  { image: heroSlide2, title: "WIN TOGETHER.", subtitle: "STAND OUT." },
  { image: heroSlide3, title: "OWN THE GAME.", subtitle: "OWN THE STYLE." },
];

const trustBadges = [
  { icon: Award, title: "Pro-Grade Quality", description: "Premium materials built for performance" },
  { icon: Globe, title: "Worldwide Delivery", description: "Fast shipping to teams everywhere" },
  { icon: Sparkles, title: "Effortless Process", description: "Simple ordering from design to delivery" },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const badgesRef = useStaggerFadeIn(0.15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full">
      {/* Main Hero - Full Width */}
      <div className="relative h-screen min-h-[600px]">
        {/* Slides - CSS transitions only */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ))}

        {/* Content - Bottom Positioned */}
        <div className="relative z-10 h-full flex items-end">
          <div className="w-full px-8 md:px-16 lg:px-24 pb-32">
            <div className="transition-all duration-500">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {slides[current].title}
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/70 leading-tight tracking-tight">
                {slides[current].subtitle}
              </h2>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 right-8 md:right-16 lg:right-24 z-20 flex items-center gap-4">
          <button 
            onClick={prev} 
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
          <button 
            onClick={next} 
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white/20 transition-all border border-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="bg-background py-8 md:py-10 border-b border-border">
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24">
          <div ref={badgesRef} className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <badge.icon className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm md:text-base text-foreground">{badge.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
