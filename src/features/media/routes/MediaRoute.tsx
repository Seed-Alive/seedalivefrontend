import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SlidersHorizontal } from 'lucide-react';
import { Badge, IconButton, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { AlbumsPayload } from '../content';

// Photo albums from recent services.
export default function MediaRoute() {
  const navigate = useNavigate();
  const { data } = useApi<AlbumsPayload>('/media/albums');
  const FEATURED = data?.featured;
  const ALBUMS = data?.albums ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-2 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <span className="flex-1 min-w-0 flex flex-col">
          <Text variant="heading-screen-24" as="h1">
            Service photos
          </Text>
          <Text variant="body-small-14" color="muted">
            Moments from our services, by SeedAlive Media
          </Text>
        </span>
        <IconButton label="Filter" variant="soft" size="sm">
          <SlidersHorizontal size={18} />
        </IconButton>
      </div>

      <button type="button" className="relative block w-full aspect-[3/2] rounded-lg overflow-hidden text-left">
        <img className="size-full object-cover" src={FEATURED?.src} alt="" />
        <span className="absolute top-3 left-3 z-[1]">
          <Badge variant="accent">New</Badge>
        </span>
        <span className="absolute inset-0 flex flex-col justify-end gap-0.5 p-3 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),transparent_60%)] text-[#fff]">
          <Text variant="overline-12">LATEST ALBUM · {FEATURED?.takenOn}</Text>
          <Text variant="heading-h1-30" as="h2" clamp={2}>
            {FEATURED?.title}
          </Text>
          <Text variant="body-small-14">{FEATURED?.meta}</Text>
        </span>
      </button>

      <Text variant="overline-12" color="muted" className="pt-6 pb-3">
        ALL ALBUMS
      </Text>

      <div className="grid grid-cols-2 gap-3">
        {ALBUMS.map((a) => (
          <button key={a.id} type="button" className="relative aspect-[3/4] rounded-lg overflow-hidden text-left">
            <img className="size-full object-cover" src={a.src} alt="" loading="lazy" />
            <span className="absolute inset-0 flex flex-col justify-end gap-0.5 p-3 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),transparent_60%)] text-[#fff]">
              <Text variant="heading-card-16" clamp={2}>
                {a.title}
              </Text>
              <Text variant="caption-12">{a.meta}</Text>
            </span>
          </button>
        ))}
      </div>

      <Text variant="caption-12" color="muted" align="center" className="py-6">
        Don’t want to appear in a photo? Open it and tap ··· to ask for it to be removed.
      </Text>
    </Screen>
  );
}
