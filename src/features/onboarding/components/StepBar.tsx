export interface StepBarProps {
  step: number;
  total: number;
}

// Shows how far through the sign-up steps someone is.
export function StepBar({ step, total }: StepBarProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 flex gap-2">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[
              'flex-1 h-1.5 rounded-full',
              i < step ? 'bg-accent' : 'bg-line',
            ].join(' ')}
          />
        ))}
      </div>
      <span className="flex-none text-label-small-13 font-sans font-normal text-muted">
        {step}/{total}
      </span>
    </div>
  );
}
