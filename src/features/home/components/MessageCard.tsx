import { Play } from 'lucide-react';
import { Text } from '@shared/components';
import type { Message } from '../content';

// One sermon in the "Latest messages" row.
export function MessageCard({ message }: { message: Message }) {
  return (
    <button type="button" className="flex-[0_0_220px] flex flex-col gap-2 text-left text-ink">
      <span className="relative grid place-items-center aspect-[16/10] rounded-lg bg-grey-800">
        <span className="grid place-items-center size-11 rounded-full bg-[#fff] text-accent-ink">
          <Play size={20} fill="currentColor" strokeWidth={0} aria-hidden />
        </span>
        <span className="absolute right-2 bottom-2 px-2 py-0.5 rounded-sm bg-[rgb(0_0_0/0.7)] text-[#fff] text-caption-12 font-semibold">{message.duration}</span>
      </span>
      <Text variant="label-small-13" color="accent-ink">
        {message.category}
      </Text>
      <Text variant="heading-card-16" clamp={2}>
        {message.title}
      </Text>
    </button>
  );
}
