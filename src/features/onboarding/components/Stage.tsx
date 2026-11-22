import type { ReactNode } from 'react';

// The dark green backdrop behind the first few onboarding screens.
const STAGE =
  'flex-1 flex flex-col w-full max-w-[480px] mx-auto min-h-dvh stage-backdrop text-ink';

export interface StageProps {
  children: ReactNode;
}

// The dark green screen the first onboarding steps sit on.
export function Stage({ children }: StageProps) {
  return (
    <div className={STAGE} data-tone="dark">
      {/* Keeps content clear of the notch and the home indicator. */}
      <div className="flex-1 flex flex-col pt-[env(safe-area-inset-top)]">{children}</div>
    </div>
  );
}
