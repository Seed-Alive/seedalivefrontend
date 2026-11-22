import { useEffect, useState } from 'react';
import { api } from './client';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Fetches a path once and reports loading and failure alongside the data.
export function useApi<T>(path: string): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    api<T>(path, { signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({ data: null, loading: false, error: error as Error });
      });

    return () => controller.abort();
  }, [path]);

  return state;
}
