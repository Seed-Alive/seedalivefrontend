import { Text } from '../Text/Text';

const HEADER = 'flex items-baseline justify-between gap-3';

// Small grey labels sit closer to the block they introduce.
const TIGHT = 'pt-4 pb-2 tracking-[0.08em]';

export interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
  tone?: 'heading' | 'overline';
}

// The title above each block on a screen, with an optional link beside it.
export function SectionHeader({ title, action, onAction, tone = 'heading' }: SectionHeaderProps) {
  const overline = tone === 'overline';
  return (
    <div className={[HEADER, overline ? TIGHT : 'pt-6 pb-3'].join(' ')}>
      <Text
        variant={overline ? 'overline-12' : 'heading-h2-20'}
        color={overline ? 'muted' : undefined}
        as={overline ? 'span' : 'h2'}
      >
        {overline ? title.toUpperCase() : title}
      </Text>
      {action && (
        <button type="button" onClick={onAction}>
          <Text variant="label-default-15" color="accent-ink" as="span">
            {action}
          </Text>
        </button>
      )}
    </div>
  );
}
