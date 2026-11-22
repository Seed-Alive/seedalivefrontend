import { useCallback, useEffect, useRef, useState } from 'react';
import type { LivePlayer, LivePlayerOptions } from '../types';

const PLUGIN = 'https://www.facebook.com/plugins/video.php';
const ALLOW = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';

// Reloading the player costs the viewer a few seconds, so ignore tiny size changes.
const RESIZE_STEP = 24;

// Builds the plugin address Facebook serves one video from.
function embedSrc(videoId: string, width: number, autoplay: boolean, muted: boolean): string {
  const href = encodeURIComponent(`https://www.facebook.com/watch/?v=${videoId}`);
  const params = [
    `href=${href}`,
    'show_text=false',
    'allowfullscreen=true',
    `width=${width}`,
    `height=${Math.round((width * 9) / 16)}`,
    `autoplay=${String(autoplay)}`,
    `mute=${muted ? '1' : '0'}`,
  ];
  return `${PLUGIN}?${params.join('&')}`;
}

// Plays a Facebook live video using Facebook's own player and controls.
export function useFacebookPlayer({
  videoId,
  autoplay = true,
  muted = true,
}: LivePlayerOptions): LivePlayer {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Facebook draws the video at the width in the address, not at the size of the frame.
  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const measure = () => {
      const next = Math.round(host.clientWidth);
      setWidth((current) => (next > 0 && Math.abs(next - current) >= RESIZE_STEP ? next : current));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = containerRef.current;
    if (!host || !videoId || !width) return;

    setReady(false);
    setError(null);

    const frame = document.createElement('iframe');
    frame.src = embedSrc(videoId, width, autoplay, muted);
    frame.title = 'Live service';
    frame.allow = ALLOW;
    frame.allowFullscreen = true;
    frame.scrolling = 'no';
    frame.addEventListener('load', () => setReady(true));
    frame.addEventListener('error', () =>
      setError(new Error('Facebook could not load this broadcast'))
    );
    host.appendChild(frame);

    return () => {
      host.replaceChildren();
    };
  }, [videoId, width, autoplay, muted]);

  const noop = useCallback(() => {}, []);

  return {
    containerRef,
    ready,
    playing: ready,
    muted,
    error,
    play: noop,
    pause: noop,
    toggleMuted: noop,
  };
}
