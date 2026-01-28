// This file now serves as a hook for reading the debug context
// Import useAnimationDebug from the context instead

export { useAnimationDebug } from "@/context/AnimationDebugContext";

// Legacy export for backwards compatibility
export const PARALLAX_ENABLED = true;
