// The wording and options shown during onboarding.

export interface Language {
  code: string;
  name: string;
}

export const LANGUAGES: readonly Language[] = [
  { code: 'en', name: 'English' },
  { code: 'yo', name: 'Yorùbá' },
  { code: 'ig', name: 'Igbo' },
  { code: 'ha', name: 'Hausa' },
  { code: 'fr', name: 'Français' },
];

export interface TourSlide {
  title: string;
  body: string;
}

export const TOUR: readonly TourSlide[] = [
  {
    title: 'Read God’s Word every day',
    body: 'Daily verses, reading plans and 40+ Bible versions — even offline. Build a habit that grows with you.',
  },
  {
    title: 'Worship anywhere',
    body: 'Join services live, catch up on sermons and listen again to recorded services.',
  },
  {
    title: 'Grow and belong',
    body: 'Read a fresh devotional every morning, join groups, share prayer requests and never miss what’s happening at church.',
  },
];

export const INTERESTS: readonly string[] = [
  'Prayer',
  'Bible study',
  'Worship music',
  'Sermons',
  'Devotionals',
  'Marriage & family',
  'Youth',
  'Healing',
  'Leadership',
  'Missions',
];

export interface NotificationPref {
  id: string;
  title: string;
  subtitle: string;
  on: boolean;
}

export const NOTIFICATIONS: readonly NotificationPref[] = [
  {
    id: 'live',
    title: 'Live services',
    subtitle: 'When a service or prayer meeting goes live',
    on: true,
  },
  { id: 'verse', title: 'Daily verse', subtitle: 'Every morning at 6:00 AM', on: true },
  {
    id: 'events',
    title: 'Events & reminders',
    subtitle: 'RSVPs, groups and church news',
    on: false,
  },
];
