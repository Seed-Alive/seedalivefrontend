import { useRef } from 'react';

// The row of single-character boxes for the emailed code.
const CELL =
  'flex-1 min-w-0 h-14 text-center bg-surface rounded-md outline-none ' +
  'inset-ring-1 inset-ring-line focus:inset-ring-2 focus:inset-ring-accent ' +
  'text-ink text-heading-h2-20 font-sans';

export interface OtpInputProps {
  value: string;
  onChange: (next: string) => void;
  length?: number;
  label?: string;
}

// Boxes for the emailed code, moving focus along as digits are typed.
export function OtpInput({ value, onChange, length = 6, label = 'Verification code' }: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const put = (index: number, digit: string) => {
    const next = value.padEnd(length, ' ').split('');
    next[index] = digit || ' ';
    onChange(next.join('').trimEnd());
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) refs.current[index - 1]?.focus();
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(digits);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  };

  return (
    <div className="flex gap-2" role="group" aria-label={label}>
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={CELL}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ''}
          onChange={(e) => put(i, e.target.value.replace(/\D/g, '').slice(-1))}
          onKeyDown={onKeyDown(i)}
          onPaste={onPaste}
        />
      ))}
    </div>
  );
}
