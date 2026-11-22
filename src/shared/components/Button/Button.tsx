import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'soft' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Rounded corners, not a full pill — chips and badges are the pills.
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg text-label-button-16 font-sans ' +
  'transition-[background-color,opacity] duration-120 ease-[ease] ' +
  'disabled:opacity-45 disabled:cursor-not-allowed';

const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-4',
  md: 'min-h-12 px-5',
  lg: 'min-h-14 px-6',
};

const VARIANTS: Record<ButtonVariant, string> = {
  // Dark fill, light label.
  primary: 'bg-primary text-on-primary enabled:hover:bg-primary-hover',
  // White with a thin outline.
  outline: 'bg-surface text-ink inset-ring-1 inset-ring-line enabled:hover:bg-surface-2',
  // Light grey with green text.
  soft: 'bg-secondary-soft text-accent-ink',
  // Green text with no background.
  link: 'bg-transparent text-accent-ink',
  danger: 'bg-danger text-on-primary',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // Buttons fill the width by default, like the designs.
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    BASE,
    SIZES[size],
    VARIANTS[variant],
    fullWidth ? 'w-full' : 'w-auto self-start',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
