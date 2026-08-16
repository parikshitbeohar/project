import { useEffect, useRef, type ReactNode } from 'react';

interface OverlayProps {
  children: ReactNode;
}

export const Overlay = ({ children }: OverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Move focus into the overlay as soon as it mounts, so keyboard/screen
  // reader users land on the dialog content (e.g. "Try again") instead of
  // being left on <body> once the background becomes inert. Restoring focus
  // back to whatever was focused before is handled by the parent, since it
  // knows what that was.
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
