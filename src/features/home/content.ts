// Shapes the home API returns, plus the fixed navigation shown on the screen.

export interface LiveNow {
  id: string;
  title: string;
  watching: number;
}

export interface DailyVerse {
  text: string;
  reference: string;
}

export interface DevotionSummary {
  id: string;
  topic: string;
}

export interface Message {
  id: string;
  category: string;
  title: string;
  duration: string;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  meta: string;
  src: string;
  isFeatured?: boolean;
}

export interface UpcomingService {
  id: string;
  title: string;
  place: string;
  startsAt: string;
}

export interface HomePayload {
  live: LiveNow | null;
  verse: DailyVerse | null;
  devotion: DevotionSummary | null;
  messages: Message[];
  albums: PhotoAlbum[];
  upcoming: UpcomingService[];
  unread: number;
}

export interface ExploreItem {
  id: string;
  label: string;
  to: string;
}

// Where the shortcut tiles lead. This is navigation, not content.
export const EXPLORE: readonly ExploreItem[] = [
  { id: 'live', label: 'Live', to: '/live' },
  { id: 'videos', label: 'Videos', to: '/media' },
  { id: 'audio', label: 'Audio', to: '/media' },
  { id: 'listen', label: 'Listen again', to: '/listen-again' },
  { id: 'devotional', label: 'Devotional', to: '/devotional' },
  { id: 'hymns', label: 'Hymns', to: '/hymns' },
  { id: 'events', label: 'Events', to: '/community' },
  { id: 'prayer', label: 'Prayer', to: '/community' },
];

export const SOCIALS: readonly string[] = ['Facebook', 'YouTube', 'X', 'Instagram'];

export const SEARCH_SUGGESTIONS: readonly string[] = [
  'Prayer',
  'Psalm 23',
  'Youth Night',
  'Peace Be Still',
];

export const SEARCH_RECENT: readonly string[] = ['The Power of Prayer', 'Romans 5', 'Hymn 341'];

export interface Notification {
  id: string;
  actor: string;
  body: string;
  kind: string;
  createdAt: string;
  unread: boolean;
}
