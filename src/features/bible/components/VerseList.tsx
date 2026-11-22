import { Text } from '@shared/components';

// Scripture set in the serif, as the designs specify.
const VERSE =
  'block [scroll-margin-block:96px] w-full p-2 rounded-sm text-left font-serif text-ink';
import type { Verse } from '../content';

export interface VerseListProps {
  title: string;
  verses: readonly Verse[];
  highlighted: number | null;
  size: number;
  lineHeight: number;
  onSelect: (verse: number) => void;
}

// The chapter heading and its verses, at the reader's chosen size.
export function VerseList({
  title,
  verses,
  highlighted,
  size,
  lineHeight,
  onSelect,
}: VerseListProps) {
  return (
    <>
      <div className="text-center pt-4 pb-6">
        <Text variant="scripture-18" as="h1">
          {title}
        </Text>
      </div>
      {verses.map((v) => (
        <button
          key={v.number}
          id={`verse-${v.number}`}
          type="button"
          onClick={() => onSelect(v.number)}
          style={{ fontSize: `${size}px`, lineHeight }}
          // The verse someone jumped to or tapped.
          className={[VERSE, v.number === highlighted ? 'bg-accent-soft' : undefined]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="text-[11px] font-bold align-super mr-1 text-muted">{v.number}</span>
          {v.text}
        </button>
      ))}
    </>
  );
}
