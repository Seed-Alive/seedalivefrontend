export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

const BASE =
  'grid place-items-center flex-none overflow-hidden rounded-full ' +
  'bg-secondary text-on-secondary font-sans font-semibold uppercase select-none';

// The small size is 11px, which the type scale has no token for.
const SIZES: Record<AvatarSize, string> = {
  sm: 'size-8 text-[11px]',
  md: 'size-10 text-label-small-13',
  lg: 'size-14 text-body-default-15',
  xl: 'size-20 text-heading-h2-20',
};

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

// Takes the first and last initial, skipping middle names.
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last) || '?';
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const classes = [BASE, SIZES[size], className].filter(Boolean).join(' ');

  if (src) {
    return (
      <span className={classes}>
        <img className="size-full object-cover" src={src} alt={name} loading="lazy" />
      </span>
    );
  }

  return (
    <span className={classes} role="img" aria-label={name}>
      {initials(name)}
    </span>
  );
}
