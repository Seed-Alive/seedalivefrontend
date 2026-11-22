import { ArrowRight, Search } from 'lucide-react';
import { Chip, Input, Sheet, Text } from '@shared/components';
import { SEARCH_RECENT, SEARCH_SUGGESTIONS } from '../content';

export interface SearchSheetProps {
  onClose: () => void;
}

// The search panel that slides up from the bottom of Home.
export function SearchSheet({ onClose }: SearchSheetProps) {
  return (
    <div className="fixed inset-0 z-20 flex flex-col justify-end bg-[rgb(0_0_0/0.45)]" role="dialog" aria-label="Search" onClick={onClose}>
      <div className="w-full max-w-[480px] mx-auto" onClick={(e) => e.stopPropagation()}>
        <Sheet grabber>
          <Text variant="heading-screen-24" as="h2">
            Search
          </Text>
          <Input label="" placeholder="Sermons, verses, events" icon={<Search size={20} />} />

          <Text variant="overline-12" color="muted" className="pt-4">
            TRY
          </Text>
          <div className="flex flex-col">
            {SEARCH_SUGGESTIONS.map((term) => (
              <button key={term} type="button" className="flex items-center gap-3 w-full min-h-12 text-left text-ink border-b border-line">
                <Search size={18} aria-hidden />
                <Text variant="body-default-15" className="flex-1">
                  {term}
                </Text>
                <ArrowRight size={18} aria-hidden />
              </button>
            ))}
          </div>

          <Text variant="overline-12" color="muted" className="pt-4">
            RECENT
          </Text>
          <div className="flex flex-wrap gap-2 pt-2">
            {SEARCH_RECENT.map((term) => (
              <Chip key={term}>{term}</Chip>
            ))}
          </div>
        </Sheet>
      </div>
    </div>
  );
}
