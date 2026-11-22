import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, Minus, Star } from 'lucide-react';
import { Button, IconButton, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { ComparisonRow, Plan } from '../content';

// One subscription option, outlined in green once it is the chosen one.
const PLAN = 'relative flex items-center gap-3 p-4 rounded-lg text-left text-ink';
const PLAN_IDLE = 'bg-surface inset-ring-1 inset-ring-line';
const PLAN_PICKED = 'bg-accent-soft inset-ring-2 inset-ring-accent';

const RADIO = 'block size-[22px] flex-none rounded-full';

// The SeedAlive Plus subscription page.
export default function ShopRoute() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState('monthly');
  const { data } = useApi<{ plans: Plan[]; comparison: ComparisonRow[] }>('/shop/plans');
  const plans = data?.plans ?? [];
  const comparison = data?.comparison ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-2 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <Text variant="heading-h2-20" as="h1" className="flex-1">
          SeedAlive Plus
        </Text>
        <Button variant="link" fullWidth={false}>
          Restore
        </Button>
      </div>

      <div className="flex flex-col items-center gap-3 pb-6">
        <span className="grid place-items-center size-14 rounded-lg bg-secondary-soft text-grey-800">
          <Star size={24} fill="currentColor" aria-hidden />
        </span>
        <Text variant="heading-h1-30" as="h2" align="center">
          Grow deeper, without distractions
        </Text>
        <Text variant="body-large-16" color="muted" align="center">
          Unlock every series, download for offline and enjoy an ad-free app. Your subscription
          supports the ministry.
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        {plans.map((p) => {
          const picked = p.id === plan;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={picked}
              onClick={() => setPlan(p.id)}
              className={[PLAN, picked ? PLAN_PICKED : PLAN_IDLE].join(' ')}
            >
              {p.isPopular && (
                <span className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-grey-900 text-grey-50 font-sans text-[11px] font-bold tracking-[0.04em]">MOST POPULAR</span>
              )}
              <span
                className={[
                  RADIO,
                  picked ? 'inset-ring-6 inset-ring-accent' : 'inset-ring-2 inset-ring-line',
                ].join(' ')}
              />
              <span className="flex-1 min-w-0 flex flex-col">
                <Text variant="heading-card-16">{p.title}</Text>
                <Text variant="body-small-14" color="muted">
                  {p.subtitle}
                </Text>
              </span>
              <span className="flex flex-col items-end">
                <Text variant="heading-h2-20">{p.display}</Text>
                <Text variant="body-small-14" color="muted">
                  {p.period}
                </Text>
              </span>
            </button>
          );
        })}
      </div>

      <div className="my-6 rounded-lg overflow-hidden inset-ring-1 inset-ring-line">
        <div className="grid grid-cols-[1fr_64px_64px] items-center gap-2 px-4 py-3 bg-secondary-soft">
          <Text variant="overline-12" color="muted">
            WHAT YOU GET
          </Text>
          <Text variant="overline-12" color="muted">
            FREE
          </Text>
          <Text variant="overline-12" color="accent-ink">
            PLUS
          </Text>
        </div>
        {comparison.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[1fr_64px_64px] items-center gap-2 px-4 py-3 border-t border-line"
          >
            <Text variant="body-default-15">{row.label}</Text>
            <span className="grid place-items-center">
              {row.inFree ? <Check size={18} /> : <Minus size={18} color="var(--color-muted)" />}
            </span>
            <span className="grid place-items-center">
              <Check size={18} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-4 pb-6">
        <Button onClick={() => navigate('/account')}>Start free trial</Button>
        <Text variant="caption-12" color="muted" align="center">
          Then ₦4,500 per month. Cancel anytime in your store settings, at least 24 hours before
          renewal.
        </Text>
      </div>
    </Screen>
  );
}
