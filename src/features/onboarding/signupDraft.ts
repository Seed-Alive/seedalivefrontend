// Carries the email and chosen topics across the sign-up screens.
const KEY = 'seedalive:signup';

export interface SignupDraft {
  email: string;
  interests: string[];
}

const EMPTY: SignupDraft = { email: '', interests: [] };

export function readDraft(): SignupDraft {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<SignupDraft>) };
  } catch {}
  return EMPTY;
}

export function saveDraft(patch: Partial<SignupDraft>): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ ...readDraft(), ...patch }));
  } catch {}
}

export function clearDraft(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
