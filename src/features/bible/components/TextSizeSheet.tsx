import { Button, Chip, Text } from '@shared/components';
import { Overlay } from './Overlay';

export type Spacing = 'Compact' | 'Comfortable';

export interface TextSizeSheetProps {
  size: number;
  spacing: Spacing;
  onSize: (next: number) => void;
  onSpacing: (next: Spacing) => void;
  onClose: () => void;
}

// Changes how big and how airy the scripture text is.
export function TextSizeSheet({ size, spacing, onSize, onSpacing, onClose }: TextSizeSheetProps) {
  return (
    <Overlay label="Text size" onClose={onClose}>
      <Text variant="heading-h2-20" as="h2">
        Text size
      </Text>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          fullWidth={false}
          disabled={size <= 14}
          onClick={() => onSize(Math.max(14, size - 1))}
        >
          A-
        </Button>
        <Text variant="heading-h2-20" className="flex-1 text-center">
          {size}px
        </Text>
        <Button
          variant="outline"
          fullWidth={false}
          disabled={size >= 28}
          onClick={() => onSize(Math.min(28, size + 1))}
        >
          A+
        </Button>
      </div>
      <p
        className="p-4 rounded-md bg-secondary-soft font-serif leading-[1.6]"
        style={{ fontSize: `${size}px`, lineHeight: spacing === 'Compact' ? 1.45 : 1.8 }}
      >
        The LORD is my shepherd; I shall not want.
      </p>
      <div className="flex items-center justify-between gap-3 pt-2">
        <Text variant="label-default-15">Line spacing</Text>
        <div className="flex gap-2">
          {(['Compact', 'Comfortable'] as const).map((option) => (
            <Chip key={option} selected={spacing === option} onClick={() => onSpacing(option)}>
              {option}
            </Chip>
          ))}
        </div>
      </div>
    </Overlay>
  );
}
