const pending = new Map<string, Promise<void>>();

// Adds an external script to the page once, however many callers ask for it.
export function loadScript(src: string): Promise<void> {
  const already = pending.get(src);
  if (already) return already;

  const promise = new Promise<void>((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = src;
    tag.async = true;
    tag.addEventListener('load', () => resolve());
    tag.addEventListener('error', () => reject(new Error(`Could not load ${src}`)));
    document.head.appendChild(tag);
  });

  pending.set(src, promise);
  return promise;
}
