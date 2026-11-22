import type { ReactNode } from 'react';
import { Sheet } from '@shared/components';

export interface OverlayProps {
  label: string;
  onClose: () => void;
  children: ReactNode;
}

// Wraps a sheet so tapping the dimmed area closes it.
export function Overlay({ label, onClose, children }: OverlayProps) {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-end bg-[rgb(0_0_0/0.45)]" role="dialog" aria-label={label} onClick={onClose}>
      <div className="w-full max-w-[480px] mx-auto" onClick={(e) => e.stopPropagation()}>
        <Sheet grabber>{children}</Sheet>
      </div>
    </div>
  );
}
