import type { ReactNode } from 'react';

// The white panel that slides up over the dark artwork.
const SHEET =
  'mt-auto max-h-[88dvh] overflow-hidden flex flex-col gap-3 pt-4 px-6 ' +
  'bg-surface text-ink rounded-t-2xl ' +
  'pb-[calc(var(--space-24)+env(safe-area-inset-bottom))]';

export interface SheetProps {
  children: ReactNode;
  grabber?: boolean;
}

// The rounded white panel that sits over the artwork on onboarding screens.
export function Sheet({ children, grabber = false }: SheetProps) {
  return (
    <div className={SHEET} data-tone="light">
      {/* The small grab handle at the top of a draggable sheet. */}
      {grabber && <span className="w-9 h-1 mx-auto mb-2 rounded-full bg-line" />}
      {children}
    </div>
  );
}
