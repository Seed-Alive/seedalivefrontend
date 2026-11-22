import { Navigate, useLocation } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import { useAuth } from '@shared/hooks/useAuth';
import { named } from './compose';

export interface AuthGuardOptions {
  // Where to send someone who is not signed in.
  redirectTo?: string;
  // Shown while we check whether they are signed in.
  pending?: ReactNode;
}

// Only lets signed-in people open a screen.
export function withAuthGuard<P extends object>({
  redirectTo = '/onboarding',
  pending = null,
}: AuthGuardOptions = {}) {
  return (Inner: ComponentType<P>): ComponentType<P> => {
    const Wrapped = (props: P) => {
      const { status } = useAuth();
      const location = useLocation();

      if (status === 'pending') return <>{pending}</>;
      if (status === 'signed-out') {
        return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
      }
      return <Inner {...props} />;
    };
    return named(Wrapped, 'withAuthGuard', Inner);
  };
}
