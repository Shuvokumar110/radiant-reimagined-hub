import { useEffect, useState, RefObject } from "react";

interface ParallaxOptions {
  speed?: number; // Positive = moves slower, Negative = moves faster
  direction?: "up" | "down";
}

export function useParallax(
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const { speed = 0.3, direction = "up" } = options;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      // Apply parallax offset based on distance from center
      const parallaxOffset = distanceFromCenter * speed * (direction === "up" ? 1 : -1);
      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, speed, direction]);

  return offset;
}
