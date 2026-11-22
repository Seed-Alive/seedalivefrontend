// Every app feature and the route it lives at.
export interface FeatureMeta {
  slug: string;
  title: string;
  path: string;
  // Which Figma section the screens come from.
  section: string;
  screens: number;
  guard: boolean;
}

export const features: readonly FeatureMeta[] = [
  {
    "slug": "onboarding",
    "title": "Onboarding",
    "path": "/onboarding",
    "section": "Onboarding",
    "screens": 10,
    "guard": false
  },
  {
    "slug": "home",
    "title": "Home",
    "path": "/",
    "section": "Home",
    "screens": 8,
    "guard": false
  },
  {
    "slug": "bible",
    "title": "Bible",
    "path": "/bible",
    "section": "Bible & media",
    "screens": 11,
    "guard": false
  },
  {
    "slug": "media",
    "title": "Media",
    "path": "/media",
    "section": "Service photos",
    "screens": 7,
    "guard": false
  },
  {
    "slug": "live-service",
    "title": "Live service",
    "path": "/live",
    "section": "Live service",
    "screens": 11,
    "guard": false
  },
  {
    "slug": "devotional",
    "title": "Devotional",
    "path": "/devotional",
    "section": "Devotional (daily)",
    "screens": 7,
    "guard": false
  },
  {
    "slug": "hymns",
    "title": "Hymns",
    "path": "/hymns",
    "section": "Hymns (Melodies of Praise)",
    "screens": 4,
    "guard": false
  },
  {
    "slug": "listen-again",
    "title": "Listen again",
    "path": "/listen-again",
    "section": "Listen again",
    "screens": 2,
    "guard": false
  },
  {
    "slug": "community",
    "title": "Community",
    "path": "/community",
    "section": "Community & events",
    "screens": 6,
    "guard": false
  },
  {
    "slug": "shop",
    "title": "Shop",
    "path": "/shop",
    "section": "Shop & membership",
    "screens": 5,
    "guard": false
  },
  {
    "slug": "account",
    "title": "Account",
    "path": "/account",
    "section": "Account",
    "screens": 3,
    "guard": true
  }
] as const;
