import { BookOpen, Check, Download, Headphones, History, Pause, Radio, Rewind, FastForward } from 'lucide-react';
import { Badge, Text } from '@shared/components';

// Floating cards that illustrate each tour slide.
const CARD = 'absolute flex p-4 rounded-lg shadow-[0_10px_30px_rgb(0_0_0/0.35)]';
const STACK = 'flex-col gap-2';

const DARK = 'bg-grey-800 text-grey-50';
const LIGHT = 'bg-grey-0 text-grey-950';

const CHIP =
  'inline-flex items-center gap-1 px-3 py-2 rounded-full bg-grey-0 text-grey-950 text-label-small-13 font-sans';

const CTA = 'grid place-items-center min-h-11 rounded-md bg-grey-950 text-grey-50 font-bold';

// Slide one: a daily verse above a reading plan.
function Scripture() {
  return (
    <>
      <div className={[CARD, STACK, DARK, 'top-4 left-4 right-8'].join(' ')}>
        <Text variant="overline-12" color="accent">
          VERSE OF THE DAY
        </Text>
        <Text variant="scripture-18">
          “Thy word is a lamp unto my feet, and a light unto my path.”
        </Text>
        <Text variant="body-small-14" color="muted">
          Psalm 119:105 · KJV
        </Text>
      </div>
      <div className={[CARD, LIGHT, 'flex-row items-center gap-3 bottom-8 right-4 left-8'].join(' ')}>
        <BookOpen size={20} aria-hidden />
        <span className="flex-1 min-w-0">
          <Text variant="label-default-15">Faith in Hard Times</Text>
          <Text variant="body-small-14" color="muted">
            Day 3 of 21
          </Text>
          <span className="block h-1 rounded-full bg-grey-200 overflow-hidden">
            <span className="block h-full bg-accent" style={{ width: '30%' }} />
          </span>
        </span>
      </div>
      <span className="absolute bottom-0 left-4 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-grey-900 text-grey-50">
        <Check size={14} />
        <Text variant="label-small-13" as="span">
          7-day streak
        </Text>
      </span>
    </>
  );
}

// Slide two: the live player and the ways to listen.
function Worship() {
  return (
    <>
      <div className={[CARD, DARK, 'flex-col gap-4 top-4 left-4 right-4'].join(' ')}>
        <Badge variant="live" icon={<Radio size={12} />}>
          LIVE · 1,204
        </Badge>
        <Text variant="heading-h2-20">Sunday Celebration Service</Text>
        <span className="flex items-center justify-center gap-6">
          <Rewind size={22} aria-hidden />
          <Pause size={26} fill="currentColor" strokeWidth={0} aria-hidden />
          <FastForward size={22} aria-hidden />
        </span>
      </div>
      <span className="absolute bottom-2 left-4 right-4 flex flex-wrap gap-2">
        <span className={CHIP}>
          <Headphones size={14} /> Audio
        </span>
        <span className={CHIP}>
          <History size={14} /> Listen again
        </span>
        <span className={CHIP}>
          <Download size={14} /> Offline
        </span>
      </span>
    </>
  );
}

// Slide three: today's devotion and a prayer request.
function Belong() {
  return (
    <>
      <div className={[CARD, STACK, LIGHT, 'top-2 left-4 right-8'].join(' ')}>
        <Text variant="body-small-14" color="muted">
          Today’s devotional
        </Text>
        <Text variant="heading-h1-30" font="serif">
          Justified
        </Text>
        <Text variant="body-small-14" color="muted">
          Romans 5:1 · 5 min read
        </Text>
        <span className={CTA}>Start reading</span>
      </div>
      <div className={[CARD, STACK, DARK, 'bottom-2 right-4 left-8'].join(' ')}>
        <Text variant="label-small-13" color="accent">
          Prayer request
        </Text>
        <Text variant="body-default-15">
          Please pray for my mum’s surgery on Friday.
        </Text>
        <Text variant="body-small-14" color="muted">
          12 praying
        </Text>
      </div>
    </>
  );
}

const SLIDES = [Scripture, Worship, Belong];

export interface TourArtProps {
  index: number;
}

// The illustration behind each tour slide.
export function TourArt({ index }: TourArtProps) {
  const Slide = SLIDES[index] ?? Scripture;
  return (
    <div className="relative flex-1 min-h-60 p-6">
      <Slide />
    </div>
  );
}
