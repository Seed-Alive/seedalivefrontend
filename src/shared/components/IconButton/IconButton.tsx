import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'soft' | 'outline' | 'dark';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'grid place-items-center flex-none rounded-md ' +
  'transition-[background-color,opacity] duration-120 ease-[ease] ' +
  'disabled:opacity-45 disabled:cursor-not-allowed';

const SIZES: Record<IconButtonSize, string> = {
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-13',
};

const VARIANTS: Record<IconButtonVariant, string> = {
  soft: 'bg-secondary-soft text-ink',
  outline: 'bg-surface text-ink inset-ring-1 inset-ring-line',
  dark: 'bg-secondary text-on-secondary',
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // An icon alone says nothing to a screen reader, so this is required.
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
}

export function IconButton({
  label,
  variant = 'soft',
  size = 'md',
  className,
  children,
  ...rest
}: IconButtonProps) {
  const classes = [BASE, SIZES[size], VARIANTS[variant], className].filter(Boolean).join(' ');

  return (
    <button className={classes} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
