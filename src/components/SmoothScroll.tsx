import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only skip for users who prefer reduced motion (accessibility)
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (prefersReducedMotion) return;

    // Initialize Lenis with smooth scrolling for ALL devices
    lenisRef.current = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      syncTouch: true, // Enable smooth touch scrolling
    });

    // Sync Lenis with Framer Motion's frame loop to prevent blinking
    const update = (data: { timestamp: number }) => {
      lenisRef.current?.raf(data.timestamp);
    };

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
