import { useEffect, useRef, type ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusable = container.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable ?? container).focus();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
    >
      {children}
    </div>
  );
};
