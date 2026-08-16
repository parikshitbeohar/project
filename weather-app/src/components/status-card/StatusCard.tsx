import type { ReactNode } from 'react';

interface StatusCardProps {
  children: ReactNode;
  role: 'status' | 'alert';
  ariaLive?: 'polite' | 'assertive';
}

export const StatusCard = ({ children, role, ariaLive }: StatusCardProps) => {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-6 text-center shadow-xl"
      role={role}
      aria-live={ariaLive}
    >
      {children}
    </div>
  );
};
