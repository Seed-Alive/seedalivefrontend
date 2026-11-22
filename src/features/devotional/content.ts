// Shapes the devotions API returns.

export interface DevotionPage {
  label: string;
  heading: string;
  body: string;
}

export interface Devotion {
  id: string;
  date: string;
  topic: string;
  pages: DevotionPage[];
}
