import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";

import jerseyRedWhite from "@/assets/products/jersey-red-white.png";
import jerseyOrange from "@/assets/products/jersey-orange.png";
import jerseyGreen from "@/assets/products/jersey-green.png";
import basketballFlame from "@/assets/products/basketball-flame.png";
import { useFadeIn, useStaggerFadeIn, useHorizontalParallax, useLayeredParallax } from "@/hooks/useGSAPAnimations";

const products = [
  { id: 1, name: "Pro Jersey - Red Storm", category: "Jerseys", slug: "jersey-red-storm", image: jerseyRedWhite, speed: -0.2 },
  { id: 2, name: "Pro Jersey - Sunset Orange", category: "Jerseys", slug: "jersey-sunset-orange", image: jerseyOrange, speed: 0.15 },
  { id: 3, name: "Pro Jersey - Forest Green", category: "Jerseys", slug: "jersey-forest-green", image: jerseyGreen, speed: -0.15 },
  { id: 4, name: "Basketball - Flame Edition", category: "Team Uniforms", slug: "basketball-flame", image: basketballFlame, speed: 0.2 },
];

export function BestSellingSection() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const headerRef = useFadeIn(0);
  const productsRef = useLayeredParallax();
  const textRef = useHorizontalParallax(0.4, 'left');

  return (
    <section className="min-h-screen py-20 bg-muted flex flex-col justify-center overflow-hidden relative">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div ref={headerRef} className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Best Sellers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              <span className="text-foreground">Top Picks.</span>
              <br />
              <span className="text-muted-foreground">Fan Favorites.</span>
            </h2>
          </div>

          <Link 
            to="/shop" 
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors flex items-center gap-2"
          >
            View All →
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-12" />

        {/* Products Grid with Layered Parallax */}
        <div ref={productsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              data-parallax-speed={product.speed}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group will-change-transform"
            >
              <Link to={`/shop/${product.slug}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl bg-background mb-4 aspect-[3/4] transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay with actions */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-500 ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}>
                    {[Heart, Eye, ShoppingBag].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  {/* Category Badge */}
                  <div className={`absolute top-3 left-3 transition-all duration-500 ${
                    hoveredProduct === product.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}>
                    <span className="px-3 py-1 bg-background/90 text-foreground text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="transition-transform duration-500 group-hover:-translate-y-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Contact for pricing
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom floating text with horizontal parallax */}
        <div className="mt-16 overflow-hidden">
          <div ref={textRef} className="text-[100px] md:text-[150px] font-bold text-foreground/5 whitespace-nowrap will-change-transform">
            PREMIUM QUALITY • CUSTOM DESIGNS • TEAM APPAREL •
          </div>
        </div>
      </div>
    </section>
  );
}
