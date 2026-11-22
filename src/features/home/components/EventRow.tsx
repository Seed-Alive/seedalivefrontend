import { ChevronRight } from 'lucide-react';
import { Text } from '@shared/components';
import type { UpcomingService } from '../content';

// One upcoming service or meeting.
const dayOf = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();

const timeOf = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit' });

export function EventRow({ event }: { event: UpcomingService }) {
  return (
    <button type="button" className="flex items-center gap-3 w-full p-3 rounded-lg bg-surface inset-ring-1 inset-ring-line text-left text-ink">
      <span className="flex flex-col items-center justify-center size-14 flex-none rounded-md bg-secondary-soft">
        <Text variant="caption-12" color="muted">
          {dayOf(event.startsAt)}
        </Text>
        <Text variant="heading-h2-20">{String(new Date(event.startsAt).getDate())}</Text>
      </span>
      <span className="flex-1 min-w-0 flex flex-col">
        <Text variant="heading-card-16" clamp={1}>
          {event.title}
        </Text>
        <Text variant="body-small-14" color="muted" clamp={1}>
          {timeOf(event.startsAt)} · {event.place}
        </Text>
      </span>
      <ChevronRight size={20} aria-hidden />
    </button>
  );
}
