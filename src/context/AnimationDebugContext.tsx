import { createContext, useContext, useState, ReactNode } from "react";

interface AnimationDebugState {
  smoothScroll: boolean;
  framerMotion: boolean;
  parallax: boolean;
  customCursor: boolean;
}

interface AnimationDebugContextType {
  state: AnimationDebugState;
  toggle: (key: keyof AnimationDebugState) => void;
  disableAll: () => void;
  enableAll: () => void;
}

const AnimationDebugContext = createContext<AnimationDebugContextType | null>(null);

export function AnimationDebugProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AnimationDebugState>({
    smoothScroll: true,
    framerMotion: true,
    parallax: true,
    customCursor: true,
  });

  const toggle = (key: keyof AnimationDebugState) => {
    setState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const disableAll = () => {
    setState({
      smoothScroll: false,
      framerMotion: false,
      parallax: false,
      customCursor: false,
    });
  };

  const enableAll = () => {
    setState({
      smoothScroll: true,
      framerMotion: true,
      parallax: true,
      customCursor: true,
    });
  };

  return (
    <AnimationDebugContext.Provider value={{ state, toggle, disableAll, enableAll }}>
      {children}
    </AnimationDebugContext.Provider>
  );
}

export function useAnimationDebug() {
  const context = useContext(AnimationDebugContext);
  if (!context) {
    // Return defaults when outside provider (non-homepage pages)
    return {
      state: {
        smoothScroll: true,
        framerMotion: true,
        parallax: true,
        customCursor: true,
      },
      toggle: () => {},
      disableAll: () => {},
      enableAll: () => {},
    };
  }
  return context;
}
