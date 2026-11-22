import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

// The outline is drawn inside so the box never shifts when it changes.
const BOX =
  'flex items-center gap-3 min-h-14 px-4 bg-surface rounded-lg text-muted ' +
  'inset-ring-1 focus-within:inset-ring-2';

const RING_OK = 'inset-ring-line focus-within:inset-ring-accent';
const RING_INVALID = 'inset-ring-danger focus-within:inset-ring-danger';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  // Small icon shown before the text.
  icon?: ReactNode;
  // Replaces the hint and turns the field red.
  error?: string;
  hint?: string;
}

export function Input({ label, icon, error, hint, className, ...rest }: InputProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      <label className="text-label-default-15 font-sans text-ink" htmlFor={id}>
        {label}
      </label>

      <div className={[BOX, error ? RING_INVALID : RING_OK].join(' ')}>
        {icon && (
          <span className="grid place-items-center flex-none" aria-hidden>
            {icon}
          </span>
        )}
        <input
          id={id}
          className="flex-1 min-w-0 bg-transparent outline-none text-ink text-body-default-15 font-sans placeholder:text-muted"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        />
      </div>

      {message && (
        <span
          id={messageId}
          className={[
            'text-body-small-14 font-sans',
            error ? 'text-danger' : 'text-muted',
          ].join(' ')}
          role={error ? 'alert' : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
}
