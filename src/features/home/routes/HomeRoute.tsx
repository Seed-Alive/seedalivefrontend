import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Screen, SectionHeader, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import {
  AppHeader, LiveBanner, DailyDeck, MiniPlayer, ExploreGrid, Rail,
  MessageCard, PhotoCard, EventRow, SearchSheet,
} from '../components';
import { SOCIALS } from '../content';
import type { HomePayload } from '../content';

// The main screen: what is on today, what is live, and where to go next.
export default function HomeRoute() {
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const { data, loading, error } = useApi<HomePayload>('/home');

  return (
    <Screen>
      <AppHeader
        greeting="Good afternoon"
        unread={data?.unread ?? 0}
        onSearch={() => setSearching(true)}
      />

      {error && (
        <Text variant="body-default-15" color="danger">
          {error.message}
        </Text>
      )}
      {loading && !data && (
        <Text variant="body-default-15" color="muted">
          Loading…
        </Text>
      )}

      <div className="flex flex-col gap-4">
        {data?.live && <LiveBanner title={data.live.title} />}
        <DailyDeck verse={data?.verse ?? null} devotion={data?.devotion ?? null} />
        <MiniPlayer title="Peace Be Still" progress={46} />
      </div>

      <SectionHeader title="Explore" />
      <ExploreGrid />

      {(data?.messages.length ?? 0) > 0 && (
        <>
          <SectionHeader title="Latest messages" action="See all" onAction={() => navigate('/media')} />
          <Rail>
            {data?.messages.map((m) => (
              <MessageCard key={m.id} message={m} />
            ))}
          </Rail>
        </>
      )}

      {(data?.albums.length ?? 0) > 0 && (
        <>
          <SectionHeader title="Service photos" action="See all" onAction={() => navigate('/media')} />
          <Rail>
            {data?.albums.map((a) => (
              <PhotoCard key={a.id} album={a} />
            ))}
          </Rail>
        </>
      )}

      {(data?.upcoming.length ?? 0) > 0 && (
        <>
          <SectionHeader title="Coming up" action="Calendar" onAction={() => navigate('/community')} />
          {data?.upcoming.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </>
      )}

      <SectionHeader title="Follow us" />
      <div className="flex flex-wrap gap-2 pb-6">
        {SOCIALS.map((name) => (
          <Chip key={name}>{name}</Chip>
        ))}
      </div>

      {searching && <SearchSheet onClose={() => setSearching(false)} />}
    </Screen>
  );
}
