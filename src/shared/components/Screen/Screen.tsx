import type { ReactNode } from 'react';

// The designs are 390px wide, so centre them on a bigger display.
const SCREEN =
  'flex-1 flex flex-col w-full max-w-[480px] mx-auto bg-bg ' +
  'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]';

export interface ScreenProps {
  children: ReactNode;
  // Removes the usual top and bottom padding for full-width images.
  flush?: boolean;
}

// The phone-shaped frame every screen sits in.
export function Screen({ children, flush = false }: ScreenProps) {
  return (
    <main className={SCREEN}>
      {/* A column so screens can push their buttons to the bottom. */}
      <div className={['flex-1 flex flex-col px-4', flush ? undefined : 'py-4'].filter(Boolean).join(' ')}>
        {children}
      </div>
    </main>
  );
}
