import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import tidiLogo from "@/assets/tidi-logo.webp";

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger content to start rendering before preloader fully exits
    const contentTimer = setTimeout(() => {
      onComplete?.();
    }, 1400);

    // Then hide preloader
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1600);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2100);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-foreground flex items-center justify-center pointer-events-none"
      style={{ willChange: "opacity" }}
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
            className="h-12 w-auto brightness-0 invert"
            style={{ objectFit: 'contain', objectPosition: 'center top' }}
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
  );
}
