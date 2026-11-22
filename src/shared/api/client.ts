// Talks to the SeedAlive API and unwraps its standard reply shape.
const BASE = import.meta.env['VITE_API_URL'] ?? 'http://localhost:4000/api/v1';

export interface ApiErrorBody {
  code: string;
  message: string;
}

// An error carrying the code and message the API sent back.
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code;
  }
}

let token: string | null = null;

// Remembers the sign-in token for later requests.
export function setToken(next: string | null): void {
  token = next;
}

interface Envelope<T> {
  data: T;
  meta?: Record<string, unknown>;
}

// Sends one request and returns just the data the API wrapped up.
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');
  if (init?.body) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (res.status === 204) return undefined as T;

  const body: unknown = await res.json().catch(() => null);

  if (!res.ok) {
    const error = (body as { error?: ApiErrorBody } | null)?.error;
    throw new ApiError(res.status, error ?? { code: 'unknown', message: res.statusText });
  }

  return (body as Envelope<T>).data;
}
