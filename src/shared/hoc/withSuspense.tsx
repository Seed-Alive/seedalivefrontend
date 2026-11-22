import { Suspense } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { named } from './compose';

// Shows a placeholder while a screen's code is still downloading.
export function withSuspense<P extends object>(fallback: ReactNode) {
  return (Inner: ComponentType<P>): ComponentType<P> => {
    const Wrapped = (props: P) => (
      <Suspense fallback={fallback}>
        <Inner {...props} />
      </Suspense>
    );
    return named(Wrapped, 'withSuspense', Inner);
  };
}
