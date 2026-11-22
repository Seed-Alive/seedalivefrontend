import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'accent' | 'neutral' | 'muted' | 'danger' | 'live';

const BASE =
  'inline-flex items-center gap-1 min-h-6 px-3 text-label-small-13 font-sans whitespace-nowrap';

const VARIANTS: Record<BadgeVariant, string> = {
  accent: 'rounded-full bg-secondary-soft text-accent-ink',
  neutral: 'rounded-full bg-secondary-soft text-gold-ink',
  muted: 'rounded-full bg-secondary-soft text-text-2',
  danger: 'rounded-full bg-danger-soft text-danger',
  // A bright red that is not in the palette, taken from the design.
  live: 'rounded-sm bg-[#ff0000] text-[#ffffff]',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export function Badge({ variant = 'neutral', icon, className, children, ...rest }: BadgeProps) {
  return (
    <span className={[BASE, VARIANTS[variant], className].filter(Boolean).join(' ')} {...rest}>
      {icon}
      {children}
    </span>
  );
}
