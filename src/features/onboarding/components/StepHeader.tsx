import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { IconButton } from '@shared/components';
import { StepBar } from './StepBar';

export interface StepHeaderProps {
  step: number;
  total?: number;
}

// Back arrow plus the progress bar shown on every sign-up step.
export function StepHeader({ step, total = 3 }: StepHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 pt-2 pb-6">
      <IconButton label="Go back" variant="outline" size="sm" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
      </IconButton>
      <StepBar step={step} total={total} />
    </div>
  );
}
