import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useIsMobile } from "@/hooks/use-mobile";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Avoid Lenis on mobile/touch devices to prevent scroll jank/blinking
    // (Framer Motion's useScroll can fight with custom scroll raf loops on mobile.)
    const isCoarsePointer =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(pointer: coarse)").matches
        : false;
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    if (isMobile || isCoarsePointer || prefersReducedMotion) return;

    // Initialize Lenis with smooth, slow scrolling settings
    lenisRef.current = new Lenis({
      duration: 1.8, // Slower, more luxurious scroll
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [isMobile]);

  return <>{children}</>;
}
