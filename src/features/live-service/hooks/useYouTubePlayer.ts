import { useCallback, useEffect, useRef, useState } from 'react';
import { loadScript } from '@shared/lib/loadScript';
import type { LivePlayer, LivePlayerOptions } from '../types';

const API_SRC = 'https://www.youtube.com/iframe_api';
const PLAYING = 1;

// What each code YouTube reports back actually means.
const ERRORS: Record<number, string> = {
  2: 'That YouTube video id is not valid',
  5: 'This browser could not play the broadcast',
  100: 'That broadcast is private or has been removed',
  101: 'The video owner has turned off playback on other websites',
  150: 'The video owner has turned off playback on other websites',
};

interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
}

interface YouTubeApi {
  Player: new (host: HTMLElement, options: Record<string, unknown>) => YouTubePlayerInstance;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let api: Promise<YouTubeApi> | null = null;

// Loads YouTube's player script once and hands every caller the same API.
function readyApi(): Promise<YouTubeApi> {
  if (api) return api;
  api = new Promise<YouTubeApi>((resolve, reject) => {
    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) resolve(window.YT);
      else reject(new Error('The YouTube player script loaded without an API'));
    };
    loadScript(API_SRC).catch(reject);
  });
  return api;
}

// Plays a YouTube broadcast behind the app's own controls rather than YouTube's.
export function useYouTubePlayer({
  videoId,
  autoplay = true,
  muted = true,
}: LivePlayerOptions): LivePlayer {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host || !videoId) return;

    let cancelled = false;
    setReady(false);
    setPlaying(false);
    setIsMuted(muted);
    setError(null);

    readyApi()
      .then((YT) => {
        if (cancelled) return;
        const mount = document.createElement('div');
        host.appendChild(mount);
        playerRef.current = new YT.Player(mount, {
          videoId,
          width: '100%',
          height: '100%',
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            mute: muted ? 1 : 0,
            controls: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              if (!cancelled) setReady(true);
            },
            onStateChange: (event: { data: number }) => {
              if (!cancelled) setPlaying(event.data === PLAYING);
            },
            onError: (event: { data: number }) => {
              if (cancelled) return;
              setError(new Error(ERRORS[event.data] ?? 'YouTube could not play this broadcast'));
            },
          },
        });
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause as Error);
      });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
      host.replaceChildren();
    };
  }, [videoId, autoplay, muted]);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);

  const toggleMuted = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isMuted) player.unMute();
    else player.mute();
    setIsMuted(!isMuted);
  }, [isMuted]);

  return { containerRef, ready, playing, muted: isMuted, error, play, pause, toggleMuted };
}
