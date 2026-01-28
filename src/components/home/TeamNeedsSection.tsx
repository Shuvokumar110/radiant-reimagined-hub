import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Users } from "lucide-react";

import heroTeam from "@/assets/hero-team.png";

const features = [
  { icon: CheckCircle, title: "Pro-Grade Quality", value: "100%" },
  { icon: Package, title: "Customization", value: "Full" },
  { icon: Truck, title: "Delivery", value: "Global" },
  { icon: Users, title: "Teams Served", value: "500+" },
];

export function TeamNeedsSection() {
  return (
    <section className="min-h-screen py-20 bg-muted flex flex-col justify-center overflow-hidden relative">
      <div className="w-full px-8 md:px-16 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
              <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                Complete Solutions
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">All You Need.</span>
              <br />
              <span className="text-muted-foreground">One Place.</span>
            </h2>
            
            <p className="text-muted-foreground mb-10">
              From jerseys to tracksuits, soccer boots to accessories - complete team 
              outfitting with your colors, logos, and player names.
            </p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background p-5 rounded-xl border border-border group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-foreground">{feature.value}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                </div>
              ))}
            </div>

            <div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 text-sm font-semibold tracking-wide uppercase hover:bg-foreground/90 transition-all rounded group"
              >
                Get Team Quote
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroTeam}
                alt="Multi-sport team apparel"
                className="w-full rounded-2xl shadow-2xl"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-foreground text-background px-6 py-3 rounded-xl shadow-xl">
                <span className="text-2xl font-bold">7+</span>
                <p className="text-xs text-background/70">Sports Covered</p>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-br from-foreground/5 to-transparent rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}