import { Badge, Text } from '@shared/components';
import type { PhotoAlbum } from '../content';

// One album in the "Service photos" row.
export function PhotoCard({ album }: { album: PhotoAlbum }) {
  return (
    <button type="button" className="relative flex-[0_0_190px] aspect-[3/4] rounded-lg overflow-hidden text-left">
      <img className="size-full object-cover" src={album.src} alt="" loading="lazy" />
      {album.isFeatured && (
        <span className="absolute top-2 left-2">
          <Badge variant="accent">New</Badge>
        </span>
      )}
      <span className="absolute inset-0 flex flex-col justify-end gap-0.5 p-3 bg-[linear-gradient(to_top,rgb(0_0_0/0.8),transparent_55%)] text-[#fff]">
        <Text variant="heading-card-16" clamp={2}>
          {album.title}
        </Text>
        <Text variant="caption-12">{album.meta}</Text>
      </span>
    </button>
  );
}
