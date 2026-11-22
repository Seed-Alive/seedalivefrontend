import { createContext, useContext } from 'react';

// 'system' follows the device setting; the others force a theme.
export type ThemePreference = 'system' | 'light' | 'dark';

export interface ThemeContextValue {
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
