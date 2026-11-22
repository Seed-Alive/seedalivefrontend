import type { ButtonHTMLAttributes } from 'react';

const TRACK =
  'relative inline-flex items-center w-13 h-8 flex-none p-0.5 rounded-full ' +
  'transition-[background-color] duration-150 ease-[ease] ' +
  'disabled:opacity-45 disabled:cursor-not-allowed';

// Always white, so it stays visible on a dark background.
const KNOB =
  'size-7 rounded-full bg-grey-0 shadow-[0_1px_3px_rgb(0_0_0/0.3)] ' +
  'transition-transform duration-150 ease-[ease]';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'children'> {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  // Needed unless something else already labels the switch.
  label?: string;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  className,
  disabled,
  ...rest
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      {...(label ? { 'aria-label': label } : {})}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      // Green is allowed here — the palette permits it for toggles.
      className={[TRACK, checked ? 'bg-accent' : 'bg-line', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className={[KNOB, checked ? 'translate-x-5' : 'translate-x-0'].join(' ')} />
    </button>
  );
}
