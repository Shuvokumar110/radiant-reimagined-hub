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

    // Skip for touch/mobile devices - use native scroll
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouchDevice) {
      // Still set up ScrollTrigger for animations on mobile, just without Lenis
      ScrollTrigger.defaults({
        scroller: window,
      });
      return;
    }

    // Initialize Lenis with smooth settings for desktop
    lenisRef.current = new Lenis({
      duration: 1.2, // Balanced scroll speed
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential decay for smooth feel
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0, // Normal scroll speed
      touchMultiplier: 1,
      infinite: false,
    });

    lenisInstance = lenisRef.current;

    // Update ScrollTrigger on Lenis scroll
    lenisRef.current.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for smooth animation loop
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing for perfect sync
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
