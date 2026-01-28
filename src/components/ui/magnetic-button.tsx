import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  onClick,
}: MagneticButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {children}
    </button>
  );
}