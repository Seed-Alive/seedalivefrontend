import { useCallback, useEffect, useRef, useState } from 'react';
import type { LivePlayer, LivePlayerOptions } from '../types';

const PLUGIN = 'https://www.facebook.com/plugins/video.php';
const ALLOW = 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share';

// Builds the plugin address Facebook serves one video from.
function embedSrc(videoId: string, autoplay: boolean, muted: boolean): string {
  const href = encodeURIComponent(`https://www.facebook.com/watch/?v=${videoId}`);
  const params = [
    `href=${href}`,
    'show_text=false',
    'allowfullscreen=true',
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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host || !videoId) return;

    setReady(false);
    setError(null);

    const frame = document.createElement('iframe');
    frame.src = embedSrc(videoId, autoplay, muted);
    frame.title = 'Live service';
    frame.allow = ALLOW;
    frame.allowFullscreen = true;
    frame.addEventListener('load', () => setReady(true));
    frame.addEventListener('error', () =>
      setError(new Error('Facebook could not load this broadcast'))
    );
    host.appendChild(frame);

    return () => {
      host.replaceChildren();
    };
  }, [videoId, autoplay, muted]);

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
