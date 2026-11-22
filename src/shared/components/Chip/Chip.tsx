import type { ButtonHTMLAttributes, ReactNode } from 'react';

const BASE =
  'inline-flex items-center gap-2 min-h-10 px-4 rounded-full text-label-default-15 font-sans ' +
  'whitespace-nowrap transition-[background-color,color] duration-120 ease-[ease]';

const IDLE = 'bg-surface text-text-2 inset-ring-1 inset-ring-line';

// A chosen chip turns solid black, never green.
const SELECTED = 'bg-primary-hover text-on-primary';

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  selected?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

// A filter pill, as used on the Bible, Community and Media screens.
export function Chip({ selected = false, icon, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={[BASE, selected ? SELECTED : IDLE, className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
