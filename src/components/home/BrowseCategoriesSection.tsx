import { Link } from "react-router-dom";
import { useFadeIn, useStaggerFadeIn } from "@/hooks/useGSAPAnimations";

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

const categories = [
  { id: "soccer", name: "Soccer", image: soccerImg },
  { id: "basketball", name: "Basketball", image: basketballImg },
  { id: "american-football", name: "American Football", image: americanFootballImg },
  { id: "cricket", name: "Cricket", image: cricketImg },
  { id: "volleyball", name: "Volleyball", image: volleyballImg },
  { id: "netball", name: "Netball", image: netballImg },
  { id: "tracksuits", name: "Tracksuits", image: tracksuitImg },
  { id: "hoodies", name: "Hoodies", image: hoodiesImg },
  { id: "polo-jerseys", name: "Polo Jerseys", image: poloImg },
  { id: "sports-jersey", name: "Sports Jersey", image: sportsJerseyImg },
];

export function BrowseCategoriesSection() {
  const headerRef = useFadeIn(0);
  const gridRef = useStaggerFadeIn(0.05);

  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Shop By Sport
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-foreground">Browse.</span>{" "}
            <span className="text-muted-foreground">Categories.</span>
          </h2>
        </div>

        {/* Categories Grid */}
        <div ref={gridRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-5">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/shop?category=${cat.id}`}>
              <div className="relative group overflow-hidden rounded-xl aspect-[3/4] cursor-pointer">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h3 className="text-white text-xs md:text-sm font-bold leading-tight transition-transform duration-300 group-hover:-translate-y-1">
                    {cat.name}
                  </h3>
                </div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View All Products <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
