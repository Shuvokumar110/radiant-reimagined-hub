import { MapPin } from "lucide-react";
import worldMap from "@/assets/world-map.png";
import { useFadeIn, useStaggerFadeIn, useScaleIn, useParallax } from "@/hooks/useGSAPAnimations";

const locations = [
  { name: "TiDi USA", x: "22%", y: "42%" },
  { name: "TiDi Canada", x: "24%", y: "28%" },
  { name: "TiDi Caribbean", x: "28%", y: "52%" },
  { name: "TiDi Europe", x: "48%", y: "28%" },
  { name: "TiDi Africa", x: "50%", y: "58%" },
  { name: "TiDi Asia", x: "78%", y: "45%" },
];

const stats = [
  { value: "6", label: "Regions" },
  { value: "50+", label: "Countries" },
  { value: "500+", label: "Teams Served" },
  { value: "24/7", label: "Support" },
];

export function LocationsSection() {
  const headerRef = useFadeIn(0);
  const mapRef = useParallax(-0.1);
  const statsRef = useStaggerFadeIn(0.1);

  return (
    <section className="min-h-screen py-20 bg-background flex flex-col justify-center overflow-hidden">
      <div className="w-full px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
            <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
              Global Reach
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Global Reach.</span>
            <br />
            <span className="text-muted-foreground">Local Service.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Strategic locations across the globe for fast delivery and exceptional service.
          </p>
        </div>

        {/* World Map Container with Parallax */}
        <div ref={mapRef} className="relative max-w-6xl mx-auto will-change-transform">
          <img src={worldMap} alt="TiDi Global Locations" className="w-full h-auto" />

          {/* Location Markers */}
          {locations.map((location) => (
            <div
              key={location.name}
              className="absolute group"
              style={{ left: location.x, top: location.y }}
            >
              {/* Pulse Ring */}
              <div className="absolute inset-0 -m-4 rounded-full bg-destructive/30 animate-ping" />
              
              {/* Marker */}
              <div className="relative z-10 cursor-pointer transition-transform duration-300 hover:scale-125">
                <MapPin className="h-6 w-6 text-destructive fill-destructive drop-shadow-lg" />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-foreground text-background px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap shadow-xl">
                    {location.name}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div ref={statsRef} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-muted rounded-xl transition-transform duration-300 hover:scale-105">
              <span className="text-3xl md:text-4xl font-bold text-foreground block">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
