import { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { IconButton, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import { ReaderToolbar, VerseList, BookPicker, VersionSheet, TextSizeSheet } from '../components';
import type { Spacing } from '../components';
import { useReaderPrefs } from '../useReaderPrefs';
import type { Book, ChapterWithVerses } from '../content';

// Reads a chapter of scripture, with the tools for marking it up.
export default function BibleRoute() {
  const [sheet, setSheet] = useState<'passage' | 'version' | 'size' | null>(null);
  const { version, setVersion, size, setSize, spacing, setSpacing } = useReaderPrefs();
  const [book, setBook] = useState(1);
  const [chapter, setChapter] = useState(1);
  const [highlighted, setHighlighted] = useState<number | null>(null);

  const { data: books } = useApi<Book[]>(`/bible/books?version=${version}`);
  const { data, loading, error } = useApi<ChapterWithVerses>(
    `/bible/${version}/${book}/${chapter}`
  );

  const current = books?.find((b) => b.number === book);
  const chapterCount = current?.chapterCount ?? 1;

  // Bring the chosen verse into view once the sheet is out of the way.
  const goToVerse = (verse: number) => {
    setHighlighted(verse);
    setSheet(null);
    requestAnimationFrame(() => {
      document.getElementById(`verse-${verse}`)?.scrollIntoView({ block: 'center' });
    });
  };

  return (
    <Screen>
      <ReaderToolbar
        book={data?.name ?? 'Loading…'}
        version={version}
        onBook={() => setSheet('passage')}
        onVersion={() => setSheet('version')}
        onTextSize={() => setSheet('size')}
      />

      {error && (
        <Text variant="body-default-15" color="danger">
          {error.message}
        </Text>
      )}
      {loading && !data && (
        <Text variant="body-default-15" color="muted">
          Loading scripture…
        </Text>
      )}
      {data && (
        <VerseList
          title={data.title}
          verses={data.verses}
          highlighted={highlighted}
          size={size}
          lineHeight={spacing === 'Compact' ? 1.45 : 1.8}
          onSelect={setHighlighted}
        />
      )}

      <div className="flex items-center gap-3 py-4">
        <IconButton
          label="Previous chapter"
          variant="outline"
          size="sm"
          disabled={chapter <= 1}
          onClick={() => setChapter((n) => Math.max(1, n - 1))}
        >
          <ChevronLeft size={18} />
        </IconButton>
        <span className="flex-1 flex flex-col items-center gap-2">
          <Text variant="body-small-14" color="muted">
            Chapter {chapter} of {chapterCount}
          </Text>
          <span className="block w-full h-1 rounded-full bg-line overflow-hidden">
            <span
              className="block h-full bg-primary"
              style={{ width: `${Math.round((chapter / chapterCount) * 100)}%` }}
            />
          </span>
        </span>
        <IconButton label="Listen to this chapter" variant="soft" size="sm">
          <Volume2 size={18} />
        </IconButton>
        <IconButton
          label="Next chapter"
          variant="dark"
          size="sm"
          disabled={chapter >= chapterCount}
          onClick={() => setChapter((n) => Math.min(chapterCount, n + 1))}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>

      {sheet === 'passage' && (
        <BookPicker
          books={books ?? []}
          currentBook={book}
          currentChapter={chapter}
          verseCount={data?.verseCount ?? 0}
          loadingChapter={loading}
          onChapter={(nextBook, nextChapter) => {
            setBook(nextBook);
            setChapter(nextChapter);
            setHighlighted(null);
          }}
          onVerse={goToVerse}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === 'version' && (
        <VersionSheet
          current={version}
          onPick={(code) => {
            setVersion(code);
            setSheet(null);
          }}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === 'size' && (
        <TextSizeSheet
          size={size}
          spacing={spacing}
          onSize={setSize}
          onSpacing={(next: Spacing) => setSpacing(next)}
          onClose={() => setSheet(null)}
        />
      )}
    </Screen>
  );
}
