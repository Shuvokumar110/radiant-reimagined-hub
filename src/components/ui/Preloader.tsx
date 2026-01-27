import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import tidiLogo from "@/assets/tidi-logo.webp";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.img
                src={tidiLogo}
                alt="TiDi Apparel"
                className="h-16 md:h-20 brightness-0 invert"
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ 
                  duration: 1.2,
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
            </motion.div>

            {/* Loading Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 w-32 h-0.5 bg-background/20 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-background rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
