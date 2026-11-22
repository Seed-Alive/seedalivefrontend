import { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import { IconButton, Input, Text } from '@shared/components';
import type { Book } from '../content';
import { Overlay } from './Overlay';

const BOOK = 'flex items-center min-h-12 px-3 py-2 rounded-md text-left';

// Numbers are short, so they pack far tighter than names.
const NUMBER = 'grid place-items-center aspect-square rounded-md text-label-default-15 font-sans';

const IDLE = 'bg-secondary-soft text-ink';

// Whatever is open right now.
const CURRENT = 'bg-accent-soft text-accent-ink';

export interface BookPickerProps {
  books: readonly Book[];
  currentBook: number;
  currentChapter: number;
  /** How many verses the open chapter has, once it has loaded. */
  verseCount: number;
  loadingChapter: boolean;
  onChapter: (book: number, chapter: number) => void;
  onVerse: (verse: number) => void;
  onClose: () => void;
}

type Step = 'book' | 'chapter' | 'verse';

// Picks a place in scripture: book, then chapter, then verse.
export function BookPicker({
  books,
  currentBook,
  currentChapter,
  verseCount,
  loadingChapter,
  onChapter,
  onVerse,
  onClose,
}: BookPickerProps) {
  const [step, setStep] = useState<Step>('book');
  const [book, setBook] = useState(currentBook);
  const [query, setQuery] = useState('');

  const chosen = books.find((b) => b.number === book);
  const shown = query
    ? books.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : books;

  // A book with a single chapter has nothing to choose, so skip that step.
  const pickBook = (next: Book) => {
    setBook(next.number);
    if (next.chapterCount === 1) {
      onChapter(next.number, 1);
      setStep('verse');
    } else {
      setStep('chapter');
    }
  };

  const pickChapter = (chapter: number) => {
    onChapter(book, chapter);
    setStep('verse');
  };

  const back = () => {
    if (step === 'verse') setStep(chosen?.chapterCount === 1 ? 'book' : 'chapter');
    else setStep('book');
  };

  const heading =
    step === 'book' ? 'Go to book' : step === 'chapter' ? chosen?.name : `${chosen?.name} ${currentChapter}`;

  return (
    <Overlay label="Go to passage" onClose={onClose}>
      <div className="flex items-center gap-2">
        {step !== 'book' && (
          <IconButton label="Back" variant="soft" size="sm" onClick={back}>
            <ChevronLeft size={18} />
          </IconButton>
        )}
        <Text variant="heading-h2-20" as="h2" className="flex-1">
          {heading}
        </Text>
      </div>

      {step === 'book' && (
        <Input
          label=""
          placeholder="Search books"
          icon={<Search size={20} />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}

      <div className="overflow-y-auto overscroll-contain min-h-0 -mx-2 px-2">
        {step === 'book' && (
          <div className="grid grid-cols-2 gap-2">
            {shown.map((b) => (
              <button
                key={b.number}
                type="button"
                onClick={() => pickBook(b)}
                data-book={b.number}
                className={[BOOK, b.number === currentBook ? CURRENT : IDLE].join(' ')}
              >
                <Text variant="label-default-15" as="span">
                  {b.name}
                </Text>
              </button>
            ))}
            {shown.length === 0 && (
              <Text variant="body-default-15" color="muted" className="py-6 text-center">
                No book matches “{query}”.
              </Text>
            )}
          </div>
        )}

        {step === 'chapter' && chosen && (
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: chosen.chapterCount }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => pickChapter(n)}
                data-chapter={n}
                className={[
                  NUMBER,
                  book === currentBook && n === currentChapter ? CURRENT : IDLE,
                ].join(' ')}
              >
                {n}
              </button>
            ))}
          </div>
        )}

        {step === 'verse' &&
          (loadingChapter ? (
            <Text variant="body-default-15" color="muted" className="py-6 text-center">
              Loading verses…
            </Text>
          ) : (
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: verseCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onVerse(n)}
                  data-verse={n}
                  className={[NUMBER, IDLE].join(' ')}
                >
                  {n}
                </button>
              ))}
            </div>
          ))}
      </div>
    </Overlay>
  );
}
