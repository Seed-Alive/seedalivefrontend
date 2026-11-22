import { Music, Play } from 'lucide-react';
import { IconButton, Text } from '@shared/components';

export interface MiniPlayerProps {
  title: string;
  progress: number;
}

// Picks up the last sermon or hymn where it was left off.
export function MiniPlayer({ title, progress }: MiniPlayerProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface inset-ring-1 inset-ring-line">
      <span className="grid place-items-center size-11 flex-none rounded-md bg-secondary-soft">
        <Music size={20} aria-hidden />
      </span>
      <span className="flex-1 min-w-0 flex flex-col gap-2">
        <Text variant="body-small-14" color="muted">
          Continue listening
        </Text>
        <Text variant="label-default-15" clamp={1}>
          {title}
        </Text>
        <span className="block h-1 rounded-full bg-line overflow-hidden">
          <span className="block h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
        </span>
      </span>
      <IconButton label={`Play ${title}`} variant="dark">
        <Play size={20} fill="currentColor" strokeWidth={0} />
      </IconButton>
    </div>
  );
}
