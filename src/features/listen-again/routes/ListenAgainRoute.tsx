import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Download, Play, Search, SlidersHorizontal } from 'lucide-react';
import { Card, Chip, IconButton, Input, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import { FILTERS } from '../content';
import type { RecordingsPayload } from '../content';

// The API sends a date, so the day and number shown on the tile come from it.
const dayOf = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
const dateOf = (iso: string) => String(new Date(iso).getDate());

// Recorded services, ready to play or download.
export default function ListenAgainRoute() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All recordings');
  const { data } = useApi<RecordingsPayload>(
    `/media/recordings${filter === 'All recordings' ? '' : `?filter=${encodeURIComponent(filter)}`}`
  );
  const LATEST = data?.latest;
  const RECORDINGS = data?.recordings ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-2 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <span className="flex-1 min-w-0 flex flex-col">
          <Text variant="heading-screen-24" as="h1">
            Listen again
          </Text>
          <Text variant="body-small-14" color="muted">
            Recorded services, ready when you are
          </Text>
        </span>
        <IconButton label="Filter" variant="soft" size="sm">
          <SlidersHorizontal size={18} />
        </IconButton>
      </div>

      <Input label="" placeholder="Search by title, pastor or date" icon={<Search size={20} />} />

      <Card variant="dark" gap={2} className="mt-4">
        <Text variant="overline-12" color="muted">
          LATEST RECORDING · {LATEST?.recordedOn}
        </Text>
        <Text variant="heading-h1-30" as="h2">
          {LATEST?.title}
        </Text>
        <Text variant="body-default-15" color="muted">
          {LATEST?.meta}
        </Text>
        <span className="flex items-center gap-4 pt-2">
          <button type="button" className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full bg-grey-0 text-grey-950">
            <Play size={18} fill="currentColor" strokeWidth={0} aria-hidden />
            <Text variant="label-button-16" as="span">
              Play
            </Text>
          </button>
          <Text variant="body-default-15" color="muted">
            {LATEST?.listens ?? 0} listens
          </Text>
        </span>
      </Card>

      <div className="flex flex-wrap gap-2 pt-4 pb-2">
        {FILTERS.map((f) => (
          <Chip key={f} selected={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <Text variant="overline-12" color="muted" className="pt-4 pb-2">
        OCTOBER 2026
      </Text>

      <Card variant="surface" padding="none">
        {RECORDINGS.map((r, i) => (
          <div
            key={r.id}
            className={[
              'flex items-start gap-3 px-4 py-3',
              i < RECORDINGS.length - 1 ? 'border-b border-line' : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="flex flex-col items-center justify-center size-12 flex-none rounded-md bg-secondary-soft">
              <Text variant="caption-12" color="muted">
                {dayOf(r.recordedOn)}
              </Text>
              <Text variant="heading-h2-20">{dateOf(r.recordedOn)}</Text>
            </span>
            <span className="flex-1 min-w-0 flex flex-col gap-0.5">
              <Text variant="label-small-13" color="accent-ink">
                {r.category}
              </Text>
              <Text variant="heading-card-16" clamp={2}>
                {r.title}
              </Text>
              <Text variant="body-small-14" color="muted">
                {r.meta}
              </Text>

            </span>
            <span className="flex flex-col gap-2 flex-none">
              <IconButton label={`Play ${r.title}`} variant="dark" size="sm">
                <Play size={16} fill="currentColor" strokeWidth={0} />
              </IconButton>
              <IconButton label={`Download ${r.title}`} variant="outline" size="sm">
                <Download size={16} />
              </IconButton>
            </span>
          </div>
        ))}
      </Card>

      <Text variant="body-small-14" color="muted" className="py-6">
        Services are added here a few hours after they end.
      </Text>
    </Screen>
  );
}
