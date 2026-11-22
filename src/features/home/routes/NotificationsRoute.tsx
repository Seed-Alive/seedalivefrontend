import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays, ChevronLeft, Circle, Ellipsis, Heart, MessageCircle, Play, SlidersHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Avatar, Chip, IconButton, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { Notification } from '../content';

const KIND_ICON: Record<string, LucideIcon> = {
  comment: MessageCircle,
  live: Play,
  like: Heart,
  event: CalendarDays,
  devotional: Circle,
};

// Everything the church and other members have sent recently.
export default function NotificationsRoute() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('All');
  const { data } = useApi<Notification[]>('/notifications');
  const { data: tabs } = useApi<string[]>('/notifications/tabs');
  const items = data ?? [];

  // The API sends a timestamp, so new and earlier are decided here.
  const isToday = (iso: string) =>
    new Date(iso).toDateString() === new Date().toDateString();
  const groups = ['NEW', 'EARLIER'] as const;

  return (
    <Screen>
      <div className="flex items-center gap-2 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <Text variant="heading-screen-24" as="h1" className="flex-1">
          Notifications
        </Text>
        <IconButton label="Filter" variant="soft" size="sm">
          <SlidersHorizontal size={18} />
        </IconButton>
        <IconButton label="More" variant="soft" size="sm">
          <Ellipsis size={18} />
        </IconButton>
      </div>

      <div className="flex gap-2 pb-4">
        {(tabs ?? []).map((name: string) => (
          <Chip key={name} selected={tab === name} onClick={() => setTab(name)}>
            {name}
          </Chip>
        ))}
      </div>

      {groups.map((group) => (
        <section key={group}>
          <Text variant="overline-12" color="muted" className="pt-4 pb-2">
            {group}
          </Text>
          {items.filter((n) => (group === 'NEW' ? isToday(n.createdAt) : !isToday(n.createdAt))).map((n) => {
            const Icon = KIND_ICON[n.kind] ?? Circle;
            return (
              <button key={n.id} type="button" className="flex items-start gap-3 w-full py-3 text-left text-ink border-b border-line">
                <span className="relative flex-none">
                  <Avatar name={n.actor} size="md" />
                  <span className="absolute -right-0.5 -bottom-0.5 grid place-items-center size-[18px] rounded-full bg-surface text-ink">
                    <Icon size={11} aria-hidden />
                  </span>
                </span>
                <span className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <Text variant="body-default-15">
                    <strong>{n.actor}</strong> {n.body}
                  </Text>
                  <Text variant="body-small-14" color="muted">
                    {new Date(n.createdAt).toLocaleString('en-GB', {
                      hour: 'numeric',
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </Text>
                </span>
                {n.unread && <span className="flex-none size-2 mt-2 rounded-full bg-ink" />}
              </button>
            );
          })}
        </section>
      ))}
    </Screen>
  );
}
