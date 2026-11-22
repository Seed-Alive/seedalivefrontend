import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen, ChevronLeft, History, Menu, Radio, Share2, SquarePen, UserPlus,
  HeartHandshake, Headphones,
} from 'lucide-react';
import {
  Badge, Card, Chip, IconButton, ListRow, Screen, SectionHeader, Text,
} from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { LivePayload } from '../content';
import { useYouTubePlayer } from '../hooks/useYouTubePlayer';
import { useFacebookPlayer } from '../hooks/useFacebookPlayer';

const ACTION_ICONS = {
  prayer: HeartHandshake,
  notes: SquarePen,
  bible: BookOpen,
  firstTimer: UserPlus,
  share: Share2,
};

const PROVIDER_NAMES: Record<string, string> = {
  youtube: 'YouTube',
  facebook: 'Facebook',
};

// The church streams on Facebook unless a service says otherwise.
const DEFAULT_PROVIDER = 'facebook';

// Turns the start time into the short line the designs show.
function startedAgo(startsAt: string): string {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(startsAt).getTime()) / 60000));
  if (minutes < 1) return 'Just started';
  if (minutes < 60) return `Started ${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `Started ${hours} hr ${rest} min ago` : `Started ${hours} hr ago`;
}

// Where to open this broadcast on the provider's own site.
function watchUrl(provider: string, videoId: string | undefined): string | null {
  if (!videoId) return null;
  if (provider === 'youtube') return `https://www.youtube.com/watch?v=${videoId}`;
  if (provider === 'facebook') return `https://www.facebook.com/watch/?v=${videoId}`;
  return null;
}

// Watch or listen to the service that is streaming now.
export default function LiveServiceRoute() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('Streams');
  const { data } = useApi<LivePayload>('/live');
  const SERVICE = data?.service;
  const ACTIONS = data?.actions ?? [];

  const video = data?.streams.find((stream) => stream.kind === 'video');
  const provider = video?.provider ?? DEFAULT_PROVIDER;
  const videoId = video?.externalId ?? undefined;
  const providerName = PROVIDER_NAMES[provider] ?? provider;
  const openUrl = watchUrl(provider, videoId);
  const isLive = SERVICE?.isLive ?? false;

  const youtube = useYouTubePlayer({ videoId: provider === 'youtube' ? videoId : undefined });
  const facebook = useFacebookPlayer({ videoId: provider === 'facebook' ? videoId : undefined });
  const player = provider === 'youtube' ? youtube : facebook;

  return (
    <Screen flush>
      <div className="bg-grey-950 text-grey-50 px-4 pt-2" data-tone="dark">
        <div className="flex items-center gap-2 py-2">
          <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
          </IconButton>
          <Text variant="heading-card-16" className="flex-1" align="center">
            Live service
          </Text>
          <IconButton label="More" variant="soft" size="sm">
            <Menu size={18} />
          </IconButton>
        </div>

        <div className="relative overflow-hidden aspect-video rounded-lg bg-grey-900">
          <div className="absolute inset-0 video-stage" ref={player.containerRef} />
          {!videoId && (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <Text variant="body-small-14" color="muted">
                No stream is linked to this service yet
              </Text>
            </div>
          )}
        </div>

        {player.error && (
          <Text variant="body-small-14" color="danger">
            {player.error.message}
          </Text>
        )}

        <div className="flex items-center justify-between gap-3 py-3">
          <Text variant="body-small-14" color="muted">
            From {providerName}
          </Text>
          {openUrl && (
            <a className="text-inherit no-underline" href={openUrl} target="_blank" rel="noreferrer">
              <Text variant="label-small-13" as="span">
                Open in {providerName}
              </Text>
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <Text variant="label-small-13" color="accent-ink">
          {isLive && SERVICE
            ? `Live now · ${startedAgo(SERVICE.startsAt)}`
            : 'Not live right now'}
        </Text>
        <Text variant="heading-h1-30" as="h1">
          {SERVICE?.title ?? 'No service live right now'}
        </Text>
        <Text variant="body-large-16" color="muted">
          {SERVICE?.speaker} · {SERVICE?.place}
        </Text>

        {/* Five quick actions in a row. */}
        <Card variant="surface" direction="row" gap={2} padding="sm" className="justify-between mt-2">
          {ACTIONS.map((a) => {
            const Icon = ACTION_ICONS[a.id as keyof typeof ACTION_ICONS] ?? BookOpen;
            return (
              <button key={a.id} type="button" className="flex flex-col items-center gap-1 flex-1 text-ink">
                <Icon size={20} aria-hidden />
                <Text variant="caption-12">{a.label}</Text>
              </button>
            );
          })}
        </Card>

        <div className="flex gap-2 pt-4 pb-2">
          {['Streams', 'Notes'].map((name) => (
            <Chip key={name} selected={tab === name} onClick={() => setTab(name)}>
              {name}
            </Chip>
          ))}
        </div>

        <ListRow
          title="Missed a service?"
          subtitle="Listen again to recorded services"
          icon={<History size={20} />}
          onClick={() => navigate('/listen-again')}
        />

        <SectionHeader title="Watch" tone="overline" />
        <div className="flex items-center gap-3 p-4 rounded-lg bg-accent-soft inset-ring-2 inset-ring-accent">
          <span className="grid place-items-center size-11 flex-none rounded-md bg-surface">
            <Radio size={20} aria-hidden />
          </span>
          <span className="flex-1 min-w-0 flex flex-col">
            <Text variant="heading-card-16">Video</Text>
            <Text variant="body-small-14" color="muted">
              {video?.detail ?? 'No video stream for this service'}
            </Text>
          </span>
          {video?.badge && <Badge variant="accent">{video.badge}</Badge>}
        </div>

        <SectionHeader title="Audio only" tone="overline" />
        <ListRow
          title="Live audio"
          subtitle="Uses far less data than video"
          icon={<Headphones size={20} />}
          onClick={() => navigate('/listen-again')}
        />
      </div>
    </Screen>
  );
}
