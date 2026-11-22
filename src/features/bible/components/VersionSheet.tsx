import { Check } from 'lucide-react';
import { Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { BibleVersion } from '../content';
import { Overlay } from './Overlay';

const ROW = 'flex items-center gap-3 w-full p-2 rounded-md text-left';

// The translation being read right now.
const CURRENT = 'bg-accent-soft text-accent-ink';

export interface VersionSheetProps {
  current: string;
  onPick: (code: string) => void;
  onClose: () => void;
}

// Switches which translation the reader shows.
export function VersionSheet({ current, onPick, onClose }: VersionSheetProps) {
  const { data, loading } = useApi<BibleVersion[]>('/bible/versions');
  const versions = data ?? [];

  return (
    <Overlay label="Choose translation" onClose={onClose}>
      <Text variant="heading-h2-20" as="h2">
        Translation
      </Text>
      {loading && (
        <Text variant="body-default-15" color="muted">
          Loading translations…
        </Text>
      )}
      <div className="flex flex-col gap-1 overflow-y-auto overscroll-contain min-h-0 -mx-2 px-2">
        {versions.map((v) => (
          <button
            key={v.code}
            type="button"
            data-version={v.code}
            onClick={() => onPick(v.code)}
            className={[ROW, v.code === current ? CURRENT : 'text-ink'].join(' ')}
          >
            <span className="grid place-items-center w-12 h-10 flex-none rounded-md bg-secondary-soft">
              <Text variant="label-small-13" as="span">
                {v.code}
              </Text>
            </span>
            <span className="flex-1 min-w-0 flex flex-col">
              <Text variant="heading-card-16" clamp={1}>
                {v.name}
              </Text>
              <Text variant="body-small-14" color="muted">
                {v.language}
              </Text>
            </span>
            {v.code === current && <Check size={20} aria-hidden />}
          </button>
        ))}
      </div>
    </Overlay>
  );
}
