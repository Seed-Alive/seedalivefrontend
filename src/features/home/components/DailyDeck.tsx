import { useRef, useState } from 'react';
import { ArrowRight, Check, Square } from 'lucide-react';
import { Text } from '@shared/components';
import type { DailyVerse, DevotionSummary } from '../content';

// The four cards are a fixed sequence; only their contents come from the API.
const DECK = [
  { kind: 'verse', overline: 'VERSE OF THE DAY', meta: 'Today', action: 'Read chapter' },
  { kind: 'devotion', overline: 'DEVOTION', meta: '5 MIN READ', action: 'Read devotion' },
  { kind: 'thought', overline: 'CONTROLLING THOUGHT', meta: 'FOR TODAY', action: 'Open' },
  { kind: 'plan', overline: 'ONE YEAR STUDY PLAN', meta: 'DAY 294 OF 365', action: 'Continue plan' },
];

interface BodyProps {
  kind: string;
  verse: DailyVerse | null;
  devotion: DevotionSummary | null;
}

// Renders what sits inside each of the four cards.
function CardBody({ kind, verse, devotion }: BodyProps) {
  if (kind === 'verse') {
    return (
      <div className="flex-1">
        <Text variant="heading-h3-18">{verse?.text ?? 'Loading today’s verse…'}</Text>
        <br />
        <Text variant="body-small-14" color="muted">
          {verse?.reference}
        </Text>
      </div>
    );
  }
  if (kind === 'devotion') {
    return (
      <div className="flex-1">
        <Text variant="display-56" as="h3" font="serif">
          {devotion?.topic ?? '—'}
        </Text>
        <div className="p-4 rounded-md bg-[rgb(255_255_255/0.14)]">
          <Text variant="overline-12">KEY VERSE · ROMANS 5:1</Text>
          <Text variant="scripture-18">
            “Therefore being justified by faith, we have peace with God through our Lord Jesus
            Christ.”
          </Text>
        </div>
      </div>
    );
  }
  if (kind === 'thought') {
    return (
      <div className="flex-1">
        <Text variant="scripture-18" as="h3">
          I am justified by faith, fully accepted and declared righteous by God.
        </Text>
        <br />
        <Text variant="label-small-13" color="muted">
          Say it out loud as you start your day
        </Text>
      </div>
    );
  }
  return (
    <div className="flex-1">
      <Text variant="heading-h2-20" as="h3">
        Today’s chapters
      </Text>
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2">
          <Check size={18} color="var(--color-accent)" />
          <Text variant="label-default-15" color="muted">
            Matthew 17
          </Text>
        </span>
        <span className="flex items-center gap-2">
          <Square size={18} />
          <Text variant="label-default-15">Mark 9</Text>
        </span>
        <span className="block h-1.5 rounded-full bg-[rgb(255_255_255/0.2)] overflow-hidden">
          <span className="block h-full bg-accent" style={{ width: '80%' }} />
        </span>
      </div>
    </div>
  );
}

export interface DailyDeckProps {
  verse: DailyVerse | null;
  devotion: DevotionSummary | null;
}

// The swipeable stack of today's verse, devotion, thought and reading plan.
export function DailyDeck({ verse, devotion }: DailyDeckProps) {
  const rail = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] -mx-4 px-4 [&::-webkit-scrollbar]:hidden" ref={rail} onScroll={onScroll}>
        {DECK.map((card, i) => (
          <div className="flex-[0_0_100%] snap-center" key={card.kind}>
            <div
              className="flex flex-col gap-3 min-h-[300px] p-5 rounded-lg"
              data-tone={card.kind === 'thought' ? 'light' : 'dark'}
              style={{
                background:
                  card.kind === 'devotion'
                    ? 'var(--color-accent-ink)'
                    : card.kind === 'thought'
                      ? 'var(--color-surface)'
                      : 'var(--grey-800)',
                color: card.kind === 'thought' ? 'var(--color-ink)' : 'var(--grey-50)',
              }}
            >
              <div className="flex items-baseline justify-between gap-3">
                <Text variant="overline-12" color={card.kind === 'verse' ? 'accent' : undefined}>
                  {card.overline}
                </Text>
                <Text variant="label-small-13" color="muted">
                  {card.meta}
                </Text>
              </div>
              <CardBody kind={card.kind} verse={verse} devotion={devotion} />
              <div className="flex items-center justify-between gap-3">
                <Text variant="label-small-13" color="muted">
                  {i + 1}/{DECK.length}
                </Text>
                <span className="flex items-center gap-2">
                  <Text variant="label-default-15">{card.action}</Text>
                  <ArrowRight size={18} aria-hidden />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 pt-4">
        {DECK.map((card, i) => (
          <span
            key={card.kind}
            className={['h-1.5 rounded-full', i === index ? 'w-5 bg-ink' : 'w-1.5 bg-line'].join(' ')}
          />
        ))}
      </div>
    </>
  );
}
