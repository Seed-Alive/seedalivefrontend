import { ChevronDown, Type } from 'lucide-react';
import { IconButton, Text } from '@shared/components';

export interface ReaderToolbarProps {
  book: string;
  version: string;
  onBook: () => void;
  onVersion: () => void;
  onTextSize: () => void;
}

// The controls above the scripture text.
export function ReaderToolbar({ book, version, onBook, onVersion, onTextSize }: ReaderToolbarProps) {
  return (
    <div className="flex items-center gap-2 py-3">
      <button type="button" className="flex-1 flex items-center justify-between gap-2 min-h-11 px-4 rounded-md bg-secondary-soft text-ink" onClick={onBook} aria-label="Choose book">
        <Text variant="heading-card-16">{book}</Text>
        <ChevronDown size={18} aria-hidden />
      </button>
      <IconButton label="Change version" variant="soft" onClick={onVersion}>
        <Text variant="label-small-13" color="accent-ink" as="span">
          {version}
        </Text>
      </IconButton>
      <IconButton label="Text size" variant="soft" onClick={onTextSize}>
        <Type size={18} />
      </IconButton>
    </div>
  );
}
