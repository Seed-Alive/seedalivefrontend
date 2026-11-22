import { useNavigate } from 'react-router-dom';
import {
  Bell, BookOpen, CalendarDays, HeartHandshake, MapPin, Megaphone, MessageCircle, Music,
} from 'lucide-react';
import {
  Avatar, Button, Card, IconButton, ListRow, Screen, SectionHeader, Text,
} from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { Feed, Group } from '../content';

const ICONS = {
  messages: MessageCircle,
  prayer: HeartHandshake,
  events: CalendarDays,
  devotionals: BookOpen,
  hymns: Music,
  branches: MapPin,
  announcements: Megaphone,
};

// The hub for messages, prayer, events and everything else people share.
export default function CommunityRoute() {
  const navigate = useNavigate();
  const { data } = useApi<{ feed: Feed; groups: Group[] }>('/community');
  const feed = data?.feed;
  const groups = data?.groups ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-3 pt-3 pb-4">
        <span className="flex-1 flex flex-col">
          <Text variant="heading-screen-24" as="h1">
            Community
          </Text>
          <Text variant="body-small-14" color="muted">
            Grow together, wherever you are
          </Text>
        </span>
        <IconButton label="Notifications" variant="soft" onClick={() => navigate('/notifications')}>
          <Bell size={20} />
        </IconButton>
      </div>

      <Card variant="dark" gap={4}>
        <span className="flex items-center gap-2">
          {(feed?.active ?? []).map((name: string) => (
            <Avatar key={name} name={name} size="sm" />
          ))}
          <Text variant="body-small-14" color="muted">
            +{feed?.count ?? 0} members active today
          </Text>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex-1 min-w-0 flex flex-col">
            <Text variant="heading-h2-20">Church feed</Text>
            <Text variant="body-small-14" color="muted">
              {feed?.unread ?? 0} new posts since your last visit
            </Text>
          </span>
          <Button size="sm" fullWidth={false}>
            Open
          </Button>
        </span>
      </Card>

      {groups.map((group) => (
        <section key={group.title}>
          <SectionHeader title={group.title} tone="overline" />
          <Card variant="surface" padding="rows">
            {group.items.map((item, i) => {
              const Icon = ICONS[item.id as keyof typeof ICONS] ?? MessageCircle;
              return (
                <ListRow
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  icon={<Icon size={20} />}
                  divider={i < group.items.length - 1}
                  onClick={() => navigate(item.href)}
                />
              );
            })}
          </Card>
        </section>
      ))}
    </Screen>
  );
}
