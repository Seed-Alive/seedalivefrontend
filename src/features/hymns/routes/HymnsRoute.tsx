import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Shuffle, SlidersHorizontal } from 'lucide-react';
import { Card, Chip, IconButton, Input, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { Hymn, HymnFilter } from '../content';

// The hymn book, searchable and available offline.
export default function HymnsRoute() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (filter !== 'All') params.set('filter', filter);
  const suffix = params.toString();

  const { data, loading, error } = useApi<Hymn[]>(`/hymns${suffix ? `?${suffix}` : ''}`);
  const { data: filterData } = useApi<HymnFilter[]>('/hymns/filters');
  const hymns = data ?? [];
  const chips = filterData ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-2 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <span className="flex-1 min-w-0 flex flex-col">
          <Text variant="heading-screen-24" as="h1">
            Hymns
          </Text>
          <Text variant="body-small-14" color="muted">
            Melodies of Praise · 1957
          </Text>
        </span>
        <IconButton label="Shuffle" variant="soft" size="sm">
          <Shuffle size={18} />
        </IconButton>
        <IconButton label="Filter" variant="soft" size="sm">
          <SlidersHorizontal size={18} />
        </IconButton>
      </div>

      <Input
        label=""
        placeholder="Number, title or words"
        icon={<Search size={20} />}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-wrap gap-2 pt-4 pb-2">
        {chips.map((f) => (
          <Chip key={f.label} selected={filter === f.label} onClick={() => setFilter(f.label)}>
            {f.label}
            {f.count ? ` ${f.count}` : ''}
          </Chip>
        ))}
      </div>

      <Text variant="body-small-14" color="muted" className="pb-3">
        {loading ? 'Loading hymns…' : error ? 'Could not load hymns' : `${hymns.length} hymns`}
      </Text>

      {error && (
        <Text variant="body-small-14" color="danger">
          {error.message}
        </Text>
      )}

      <Card variant="surface" padding="none">
        {hymns.map((h, i) => (
          <div
            key={h.number}
            className={[
              'flex items-center gap-3 px-4 py-3',
              i < hymns.length - 1 ? 'border-b border-line' : undefined,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="grid place-items-center size-8 flex-none rounded-sm bg-secondary-soft">
              <Text variant="label-small-13">{h.number}</Text>
            </span>
            <span className="flex-1 min-w-0 flex flex-col">
              <Text variant="heading-card-16" clamp={2}>
                {h.title}
              </Text>
              <Text variant="body-small-14" color="muted">
                {h.author} · {h.year}
              </Text>
            </span>
            {h.hasWords && (
              <Text variant="body-small-14" color="muted">
                Details
              </Text>
            )}
          </div>
        ))}
      </Card>
    </Screen>
  );
}
