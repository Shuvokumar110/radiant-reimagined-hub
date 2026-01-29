import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import tidiLogo from "@/assets/tidi-logo.webp";

interface MaintenanceModeProps {
  children: ReactNode;
}

// Secret path to access the site (change this to whatever you want)
const SECRET_ACCESS_PATH = "/tidi-preview-2026";

// Session storage key to remember access
const ACCESS_KEY = "tidi_maintenance_bypass";

export function MaintenanceMode({ children }: MaintenanceModeProps) {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // Allow access for Lovable domains (preview and published)
    if (hostname.includes("lovable")) {
      setHasAccess(true);
      return;
    }

    // Allow access for localhost during development
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      setHasAccess(true);
      return;
    }

    // Check if user has previously accessed via secret path
    if (sessionStorage.getItem(ACCESS_KEY) === "true") {
      setHasAccess(true);
      return;
    }

    // Check if accessing via secret path
    if (pathname === SECRET_ACCESS_PATH || pathname.startsWith(SECRET_ACCESS_PATH + "/")) {
      // Grant access and store in session
      sessionStorage.setItem(ACCESS_KEY, "true");
      // Redirect to home page after granting access
      window.location.href = "/";
      return;
    }

    // Otherwise, show maintenance mode
    setHasAccess(false);
  }, []);

  // Loading state
  if (hasAccess === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <img src={tidiLogo} alt="TiDi Sports" className="h-16 w-auto opacity-50" />
        </div>
      </div>
    );
  }

  // Maintenance mode
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          <img 
            src={tidiLogo} 
            alt="TiDi Sports" 
            className="h-20 w-auto mx-auto mb-8"
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Coming Soon
            </h1>
            
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            
            <p className="text-lg text-white/70">
              We're working hard to bring you something amazing. 
              Our new website is under construction.
            </p>
            
            <p className="text-sm text-white/50 mt-8">
              Premium Italian Soccer Boots & Team Apparel
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex gap-2 justify-center mt-12">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="absolute bottom-8 text-white/30 text-xs">
          © {new Date().getFullYear()} TiDi Sports. All rights reserved.
        </div>
      </div>
    );
  }

  // Normal access
  return <>{children}</>;
}
