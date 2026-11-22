import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

const ROW = 'flex items-center gap-3 w-full min-h-[66px] py-3 text-left text-ink';

export interface ListRowProps {
  title: string;
  subtitle?: string;
  // Small icon shown in a grey tile on the left.
  icon?: ReactNode;
  // Replaces the arrow on the right, with a switch or badge for example.
  trailing?: ReactNode;
  divider?: boolean;
  onClick?: () => void;
  className?: string;
}

// A row is only a button when it does something, to keep tabbing sensible.
export function ListRow({
  title,
  subtitle,
  icon,
  trailing,
  divider = false,
  onClick,
  className,
}: ListRowProps) {
  const classes = [ROW, divider ? 'border-b border-line' : undefined, className]
    .filter(Boolean)
    .join(' ');

  const body = (
    <>
      {icon && (
        <span className="grid place-items-center size-11 flex-none rounded-md bg-secondary-soft text-ink">
          {icon}
        </span>
      )}
      {/* Without this the title and subtitle run together on one line. */}
      <span className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-heading-card-16 font-sans">{title}</span>
        {subtitle && (
          <span className="text-body-small-14 font-sans text-muted truncate">{subtitle}</span>
        )}
      </span>
      <span className="flex-none grid place-items-center text-muted">
        {trailing ?? (onClick ? <ChevronRight size={20} aria-hidden /> : null)}
      </span>
    </>
  );

  return onClick ? (
    <button type="button" className={classes} onClick={onClick}>
      {body}
    </button>
  ) : (
    <div className={classes}>{body}</div>
  );
}
