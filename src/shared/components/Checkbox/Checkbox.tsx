import { Check } from 'lucide-react';

const BOX = 'grid place-items-center size-[22px] flex-none rounded-sm';

const UNCHECKED = 'bg-surface inset-ring-1 inset-ring-line text-transparent';

// Green is allowed here, the same as for toggles.
const CHECKED = 'bg-accent text-on-accent';

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  label: string;
}

// A tick box, used for things like staying signed in.
export function Checkbox({ checked, onCheckedChange, label }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className="inline-flex items-center gap-2 text-ink"
      onClick={() => onCheckedChange(!checked)}
    >
      <span className={[BOX, checked ? CHECKED : UNCHECKED].join(' ')}>
        <Check size={14} strokeWidth={3} aria-hidden />
      </span>
      {label}
    </button>
  );
}
