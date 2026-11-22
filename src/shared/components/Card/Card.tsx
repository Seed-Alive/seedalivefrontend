import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'surface' | 'dark' | 'accent' | 'tonal';
export type CardGap = 2 | 3 | 4 | 5;
export type CardPadding = 'default' | 'sm' | 'rows' | 'none';
export type CardDirection = 'column' | 'row';

const BASE = 'flex rounded-lg overflow-hidden';

const DIRECTIONS: Record<CardDirection, string> = {
  column: 'flex-col',
  row: 'flex-row',
};

const GAPS: Record<CardGap, string> = {
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
};

// Cards full of list rows let the rows carry their own padding.
const PADDING: Record<CardPadding, string> = {
  default: 'p-5',
  sm: 'p-3',
  rows: 'px-4',
  none: 'p-0',
};

const VARIANTS: Record<CardVariant, string> = {
  surface: 'bg-surface text-ink inset-ring-1 inset-ring-line',
  // Stays dark in both themes, so it uses a fixed grey.
  dark: 'bg-grey-800 text-grey-50',
  accent: 'bg-accent-ink text-grey-0',
  tonal: 'bg-secondary-soft text-ink',
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  gap?: CardGap;
  padding?: CardPadding;
  direction?: CardDirection;
  children: ReactNode;
}

export function Card({
  variant = 'surface',
  gap = 3,
  padding = 'default',
  direction = 'column',
  className,
  children,
  ...rest
}: CardProps) {
  const classes = [BASE, DIRECTIONS[direction], GAPS[gap], PADDING[padding], VARIANTS[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
