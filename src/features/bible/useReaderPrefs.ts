import { useCallback, useState } from 'react';
import type { Spacing } from './components';

const KEY = 'seedalive:reader';

interface Prefs {
  version: string;
  size: number;
  spacing: Spacing;
}

const DEFAULTS: Prefs = { version: 'KJV', size: 19, spacing: 'Comfortable' };

// Reading settings are personal, so they are remembered on this device.
function read(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {}
  return DEFAULTS;
}

// Keeps the chosen translation, text size and line spacing.
export function useReaderPrefs() {
  const [prefs, setPrefs] = useState<Prefs>(read);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs((current) => {
      const next = { ...current, ...patch };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return {
    version: prefs.version,
    size: prefs.size,
    spacing: prefs.spacing,
    setVersion: (version: string) => update({ version }),
    setSize: (size: number) => update({ size }),
    setSpacing: (spacing: Spacing) => update({ spacing }),
  };
}
