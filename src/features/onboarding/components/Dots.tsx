export interface DotsProps {
  index: number;
  total: number;
}

// Shows which tour slide is open.
export function Dots({ index, total }: DotsProps) {
  return (
    <div className="flex items-center gap-2" role="presentation">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={[
            'h-2 rounded-full transition-[width,background-color] duration-150 ease-[ease]',
            i === index ? 'w-6 bg-accent' : 'w-2 bg-line',
          ].join(' ')}
        />
      ))}
    </div>
  );
}
