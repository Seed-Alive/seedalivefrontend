import type { ReactNode } from 'react';

// Holds cards in a row that scrolls sideways.
export function Rail({ children }: { children: ReactNode }) {
  return <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] -mx-4 px-4 [&::-webkit-scrollbar]:hidden">{children}</div>;
}
