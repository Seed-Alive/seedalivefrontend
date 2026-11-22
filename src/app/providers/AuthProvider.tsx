import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { api, setToken } from '@shared/api/client';
import { AuthContext } from '@shared/hooks/useAuth';
import type { AuthStatus, AuthUser } from '@shared/hooks/useAuth';

const TOKEN_KEY = 'seedalive:token';

function readToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function writeToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
}

// Holds the signed-in session, checked against the API rather than assumed.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('pending');

  // A stored token only counts once the server agrees it is still valid.
  useEffect(() => {
    const token = readToken();
    if (!token) {
      setStatus('signed-out');
      return;
    }
    setToken(token);
    api<{ user: AuthUser }>('/auth/me')
      .then((data) => {
        setUser(data.user);
        setStatus('signed-in');
      })
      .catch(() => {
        setToken(null);
        writeToken(null);
        setStatus('signed-out');
      });
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const data = await api<{ token: string; user: AuthUser }>('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    writeToken(data.token);
    setUser(data.user);
    setStatus('signed-in');
  }, []);

  // Sign-up ends with a token already issued, so there is nothing to re-check.
  const acceptSession = useCallback((token: string, next: AuthUser) => {
    setToken(token);
    writeToken(token);
    setUser(next);
    setStatus('signed-in');
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api<void>('/auth/sign-out', { method: 'POST' });
    } catch {
      // The session is going either way, so a failed call must not block it.
    }
    setToken(null);
    writeToken(null);
    setUser(null);
    setStatus('signed-out');
  }, []);

  const value = useMemo(
    () => ({ status, user, signIn, acceptSession, signOut }),
    [status, user, signIn, acceptSession, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
