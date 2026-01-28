import { useAnimationDebug } from "@/context/AnimationDebugContext";
import { X, Bug } from "lucide-react";
import { useState } from "react";

export function AnimationDebugPanel() {
  const { state, toggle, disableAll, enableAll } = useAnimationDebug();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[10000] bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        style={{ cursor: "pointer" }}
      >
        <Bug className="w-5 h-5" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 z-[10000] bg-foreground text-background p-3 rounded-lg shadow-lg flex items-center gap-2"
        style={{ cursor: "pointer" }}
      >
        <Bug className="w-4 h-4 text-red-400" />
        <span className="text-xs font-medium">Debug</span>
        <button
          onClick={() => setIsMinimized(false)}
          className="ml-2 text-background/70 hover:text-background"
          style={{ cursor: "pointer" }}
        >
          ↑
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="text-background/70 hover:text-background"
          style={{ cursor: "pointer" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const toggles: { key: keyof typeof state; label: string }[] = [
    { key: "smoothScroll", label: "Smooth Scroll (Lenis)" },
    { key: "framerMotion", label: "Framer Motion" },
    { key: "parallax", label: "Parallax Effects" },
    { key: "customCursor", label: "Custom Cursor" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[10000] bg-foreground text-background p-4 rounded-xl shadow-2xl w-72 border border-background/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bug className="w-4 h-4 text-red-400" />
          <span className="font-semibold text-sm">Animation Debug</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-background/70 hover:text-background p-1"
            style={{ cursor: "pointer" }}
          >
            ↓
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-background/70 hover:text-background p-1"
            style={{ cursor: "pointer" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {toggles.map(({ key, label }) => (
          <label
            key={key}
            className="flex items-center justify-between gap-3"
            style={{ cursor: "pointer" }}
          >
            <span className="text-sm text-background/80">{label}</span>
            <button
              onClick={() => toggle(key)}
              className={`w-10 h-6 rounded-full transition-colors relative ${
                state[key] ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ cursor: "pointer" }}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  state[key] ? "left-5" : "left-1"
                }`}
              />
            </button>
          </label>
        ))}
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-background/20">
        <button
          onClick={disableAll}
          className="flex-1 text-xs py-2 px-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          style={{ cursor: "pointer" }}
        >
          Disable All
        </button>
        <button
          onClick={enableAll}
          className="flex-1 text-xs py-2 px-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          style={{ cursor: "pointer" }}
        >
          Enable All
        </button>
      </div>

      <p className="text-xs text-background/50 mt-3">
        Toggle each animation system to identify the blinking source.
      </p>
    </div>
  );
}
