import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip for reduced motion preference
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    lenisInstance = lenisRef.current;

    // Update ScrollTrigger on Lenis scroll
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for smooth animation loop
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    // Tell GSAP to use Lenis's scroll position
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}

export function getLenis() {
  return lenisInstance;
}
