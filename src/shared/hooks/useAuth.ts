import { createContext, useContext } from 'react';

export type AuthStatus = 'pending' | 'signed-in' | 'signed-out';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  campus: string;
  memberSince: string;
}

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  acceptSession: (token: string, user: AuthUser) => void;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
