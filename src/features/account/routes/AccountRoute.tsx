import { useNavigate } from 'react-router-dom';
import {
  Bookmark, Download, ListMusic, LogOut, Pencil, Settings, Star,
} from 'lucide-react';
import {
  Avatar, Button, Card, IconButton, ListRow, Screen, SectionHeader, Switch, Text,
} from '@shared/components';
import { useAuth } from '@shared/hooks/useAuth';
import { useTheme } from '@shared/hooks/useTheme';
import { useApi } from '@shared/api/useApi';
import type { Profile } from '../content';

const ICONS = {
  playlists: ListMusic,
  favourites: Bookmark,
  downloads: Download,
  notes: Pencil,
};

// The signed-in profile, library shortcuts and app preferences.
export default function AccountRoute() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { data } = useApi<Profile>('/auth/me');
  const user = data?.user;
  const stats = data?.stats ?? [];
  const library = data?.library ?? [];
  const { preference, setPreference } = useTheme();
  const dark = preference === 'dark';

  return (
    <Screen>
      <div className="flex items-center gap-3 pt-3 pb-4">
        <Text variant="heading-screen-24" as="h1" className="flex-1">
          Profile
        </Text>
        <IconButton label="Settings" variant="soft">
          <Settings size={20} />
        </IconButton>
      </div>

      <Card variant="surface" gap={4}>
        <span className="flex items-center gap-4">
          <Avatar name={user?.name ?? 'Guest'} size="xl" />
          <span className="flex-1 min-w-0 flex flex-col">
            <Text variant="heading-h2-20">{user?.name}</Text>
            <Text variant="body-default-15" color="muted">
              {user?.email}
            </Text>
            <Text variant="body-small-14" color="muted">
              {user?.campus} · Member since {user?.memberSince}
            </Text>
          </span>
        </span>
        <span className="grid grid-cols-3 pt-4 border-t border-line">
          {stats.map((s) => (
            <span key={s.label} className="flex flex-col items-center">
              <Text variant="heading-h2-20">{s.value}</Text>
              <Text variant="body-small-14" color="muted">
                {s.label}
              </Text>
            </span>
          ))}
        </span>
      </Card>

      <ListRow
        title="Go further with SeedAlive Plus"
        subtitle="Ad-free, downloads and all premium series"
        icon={<Star size={20} fill="currentColor" />}
        onClick={() => navigate('/shop')}
      />

      <SectionHeader title="My library" tone="overline" />
      <Card variant="surface" padding="rows">
        {library.map((item, i) => {
          const Icon = ICONS[item.id as keyof typeof ICONS] ?? Bookmark;
          return (
            <ListRow
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={<Icon size={20} />}
              divider={i < library.length - 1}
              onClick={() => undefined}
            />
          );
        })}
      </Card>

      <SectionHeader title="Preferences" tone="overline" />
      <Card variant="surface" padding="rows">
        <ListRow
          title="Push notifications"
          subtitle="Live services, events and replies"
          divider
          trailing={<Switch checked onCheckedChange={() => undefined} label="Push notifications" />}
        />
        <ListRow
          title="Dark mode"
          subtitle="Easier on the eyes at night"
          divider
          trailing={
            <Switch
              checked={dark}
              onCheckedChange={(next) => setPreference(next ? 'dark' : 'light')}
              label="Dark mode"
            />
          }
        />
        <ListRow title="Language" trailing={<Text color="muted">English</Text>} />
      </Card>

      <div className="flex flex-col gap-3 py-6">
        <Button variant="outline" onClick={() => void signOut()}>
          <LogOut size={18} />
          <Text color="danger" as="span">
            Sign out
          </Text>
        </Button>
        <Text variant="caption-12" color="muted" align="center">
          SeedAlive 2.0.0
        </Text>
      </div>
    </Screen>
  );
}
