import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasAnimated(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasAnimated };
}

export function useParallax(
  speed: number = 0.5,
  options: { enabled?: boolean } = {}
): {
  ref: RefObject<HTMLDivElement>;
  offset: MotionValue<number>;
} {
  const { enabled = true } = options;
  // IMPORTANT:
  // Using React state here causes a full component re-render on every scroll tick.
  // With Lenis + Framer Motion, that can manifest as "blinking"/flicker.
  // A MotionValue updates styles without re-rendering.
  const offset = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const rafIdRef = useRef<number | null>(null);
  const latestSpeedRef = useRef(speed);
  latestSpeedRef.current = speed;

  useEffect(() => {
    if (!enabled) {
      offset.set(0);
      return;
    }

    const compute = () => {
      rafIdRef.current = null;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollProgress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

      // Keep the same output range as before (px-ish values)
      offset.set(scrollProgress * latestSpeedRef.current * 100);
    };

    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(compute);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [enabled, offset]);

  return { ref, offset };
}

