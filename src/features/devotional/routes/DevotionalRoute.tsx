import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Share2, X } from 'lucide-react';
import { IconButton, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { Devotion } from '../content';

// Today's devotion, read one page at a time.
export default function DevotionalRoute() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { data } = useApi<Devotion>('/devotional/today');
  const pages = data?.pages ?? [];
  const total = pages.length;
  const current = pages[page];

  if (!current) return null;

  return (
    <div className="flex-1 flex flex-col w-full max-w-[480px] mx-auto min-h-dvh px-4 py-2 pt-[calc(var(--space-8)+env(safe-area-inset-top))] bg-[linear-gradient(to_bottom,var(--color-surface),var(--color-accent-soft))] text-ink" data-tone="light">
      <div className="flex gap-1 py-2">
        {pages.map((p, i) => (
          <span
            key={p.heading}
            className={['flex-1 h-[3px] rounded-full', i <= page ? 'bg-primary' : 'bg-line'].join(' ')}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 py-2">
        <IconButton label="Close" variant="outline" size="sm" onClick={() => navigate(-1)}>
          <X size={18} />
        </IconButton>
        <Text variant="overline-12" className="flex-1 text-center tracking-[0.18em]">
          SEED ALIVE
        </Text>
        <IconButton label="Share" variant="outline" size="sm">
          <Share2 size={18} />
        </IconButton>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3 px-4">
        <Text variant="body-small-14" color="muted" align="center">
          {data?.date}
        </Text>
        <Text variant="overline-12" color="accent-ink" align="center">
          {current.label}
        </Text>
        <Text variant="display-56" as="h1" align="center" font="serif" className="font-serif font-normal">
          {current.heading}
        </Text>
        <Text variant="body-large-16" color="muted" align="center">
          {current.body}
        </Text>
      </div>

      <div className="flex flex-col gap-2 pb-[calc(var(--space-16)+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3">
          <IconButton
            label="Previous"
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((n) => Math.max(0, n - 1))}
          >
            <ChevronLeft size={20} />
          </IconButton>
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-14 rounded-lg bg-primary text-on-primary"
            onClick={() => setPage((n) => Math.min(total - 1, n + 1))}
          >
            <Text variant="label-button-16" as="span">
              {page === 0 ? 'Start reading' : 'Continue'}
            </Text>
            <ArrowRight size={18} aria-hidden />
          </button>
          <IconButton
            label="Next"
            variant="outline"
            disabled={page === total - 1}
            onClick={() => setPage((n) => Math.min(total - 1, n + 1))}
          >
            <ChevronRight size={20} />
          </IconButton>
        </div>
        <Text variant="caption-12" color="muted" align="center">
          {page + 1}/{total} · Today
        </Text>
      </div>
    </div>
  );
}
