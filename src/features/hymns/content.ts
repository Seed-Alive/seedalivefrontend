// Shapes the hymns API returns.

export interface Hymn {
  number: number;
  title: string;
  author: string;
  year: number;
  hasWords: boolean;
}

export interface HymnFilter {
  label: string;
  count?: number;
}
