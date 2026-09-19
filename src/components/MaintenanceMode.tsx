import { ReactNode } from "react";

interface MaintenanceModeProps {
  children: ReactNode;
}

export function MaintenanceMode({ children }: MaintenanceModeProps) {
  // Maintenance mode disabled — site is live
  return <>{children}</>;
}
