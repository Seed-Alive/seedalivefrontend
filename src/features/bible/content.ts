// Shapes the Bible API returns. The text itself always comes from the server.

export interface Book {
  number: number;
  name: string;
  chapterCount: number;
}

export interface Verse {
  number: number;
  text: string;
}

export interface ChapterWithVerses {
  id: string;
  name: string;
  title: string;
  verseCount: number;
  verses: Verse[];
}

export interface BibleVersion {
  code: string;
  name: string;
  language: string;
  sizeMb: string | null;
}
