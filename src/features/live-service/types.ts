import type { RefObject } from 'react';

// Which service a live stream plays from.
export type StreamProvider = 'youtube' | 'facebook';

// What a player hook reports, whichever provider is behind it.
export interface LivePlayerState {
  ready: boolean;
  playing: boolean;
  muted: boolean;
  error: Error | null;
}

// The calls the app's own player controls make.
export interface LivePlayerControls {
  play: () => void;
  pause: () => void;
  toggleMuted: () => void;
}

// A mounted player: attach the ref, read the state, wire the controls.
export interface LivePlayer extends LivePlayerState, LivePlayerControls {
  containerRef: RefObject<HTMLDivElement | null>;
}

// What both player hooks accept.
export interface LivePlayerOptions {
  videoId: string | undefined;
  autoplay?: boolean;
  muted?: boolean;
}
