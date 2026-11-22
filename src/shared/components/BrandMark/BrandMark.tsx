export interface BrandMarkProps {
  size?: number;
  className?: string;
}

// The SeedAlive logo, drawn in whatever colour its parent uses.
export function BrandMark({ size = 96, className }: BrandMarkProps) {
  const height = size;
  const width = Math.round(size * 0.78);
  return (
    <span
      className={['block brand-mark', className].filter(Boolean).join(' ')}
      style={{ width, height }}
      role="img"
      aria-label="SeedAlive"
    />
  );
}
