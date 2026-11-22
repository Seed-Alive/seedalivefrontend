import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CalendarDays, Radio } from 'lucide-react';
import { Button, Card, ListRow, Screen, Switch, Text } from '@shared/components';
import { StepHeader } from '../components';
import { api } from '@shared/api/client';
import { NOTIFICATIONS } from '../content';
import { clearDraft, readDraft } from '../signupDraft';

const PREVIEW = [
  { Icon: Radio, title: 'Live now: Sunday Celebration', body: 'Tap to join 1,204 others', at: 'now' },
  { Icon: BookOpen, title: 'Verse of the day', body: '“Thy word is a lamp unto my fe…', at: '6:00' },
  { Icon: CalendarDays, title: 'Youth Night starts in 1 hour', body: 'Youth centre · 5:00 PM', at: '4:00' },
];

// Lets someone choose which reminders the app may send.
export default function NotificationsRoute() {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.on]))
  );

  // Reminders are saved along with the topics chosen a step earlier.
  const finish = async (allow: boolean) => {
    const chosen = allow ? prefs : Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, false]));
    try {
      await api('/auth/me/preferences', {
        method: 'PATCH',
        body: JSON.stringify({ interests: readDraft().interests, notifications: chosen }),
      });
    } catch {
      // Preferences are not worth blocking the end of sign-up over.
    }
    clearDraft();
    navigate('/', { replace: true });
  };

  return (
    <Screen>
      <StepHeader step={3} />

      <Card variant="dark" gap={2} className="mb-6">
        {PREVIEW.map(({ Icon, title, body, at }) => (
          <div key={title} className="flex items-center gap-3 px-3 py-2 rounded-md bg-[rgb(255_255_255/0.08)]">
            <span className="grid place-items-center size-9 flex-none rounded-md bg-[rgb(255_255_255/0.1)]">
              <Icon size={20} aria-hidden />
            </span>
            <span className="flex-1 min-w-0 flex flex-col">
              <Text variant="label-small-13" clamp={1}>
                {title}
              </Text>
              <Text variant="caption-12" color="muted" clamp={1}>
                {body}
              </Text>
            </span>
            <Text variant="caption-12" color="muted">
              {at}
            </Text>
          </div>
        ))}
      </Card>

      <div className="flex flex-col gap-2 mb-6">
        <Text variant="heading-h1-30" as="h1">
          Stay in the loop
        </Text>
        <Text variant="body-large-16" color="muted">
          Choose what we remind you about. You can change this any time in Settings.
        </Text>
      </div>

      <Card variant="surface" padding="rows" className="py-5">
        {NOTIFICATIONS.map((pref, i) => (
          <ListRow
            key={pref.id}
            title={pref.title}
            subtitle={pref.subtitle}
            divider={i < NOTIFICATIONS.length - 1}
            trailing={
              <Switch
                checked={prefs[pref.id] ?? false}
                onCheckedChange={(next) => setPrefs((p) => ({ ...p, [pref.id]: next }))}
                label={pref.title}
              />
            }
          />
        ))}
      </Card>

      <div className="mt-auto flex flex-col gap-2 pt-8">
        <Button onClick={() => void finish(true)}>Allow notifications</Button>
        <Button variant="link" onClick={() => void finish(false)}>
          Not now
        </Button>
      </div>
    </Screen>
  );
}
