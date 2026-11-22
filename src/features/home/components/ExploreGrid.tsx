import { useNavigate } from 'react-router-dom';
import {
  BookOpen, CalendarDays, Headphones, History, Music, Radio, Tv, HeartHandshake,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Text } from '@shared/components';
import { EXPLORE } from '../content';

const ICONS: Record<string, LucideIcon> = {
  live: Radio,
  videos: Tv,
  audio: Headphones,
  listen: History,
  devotional: BookOpen,
  hymns: Music,
  events: CalendarDays,
  prayer: HeartHandshake,
};

// The grid of shortcuts to the main parts of the app.
export function ExploreGrid() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-4 gap-3">
      {EXPLORE.map((item) => {
        const Icon = ICONS[item.id] ?? BookOpen;
        return (
          <button
            key={item.id}
            type="button"
            className="flex flex-col items-center gap-2 text-ink"
            onClick={() => navigate(item.to)}
          >
            <span className="grid place-items-center w-full aspect-square rounded-lg bg-secondary-soft">
              <Icon size={22} aria-hidden />
            </span>
            <Text variant="label-small-13" className="text-center">
              {item.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
}
