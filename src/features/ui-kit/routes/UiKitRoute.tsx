// The UI kit screen.
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Mail, Search, Play, Calendar, Radio } from 'lucide-react';
import {
  Screen, Text, Button, IconButton, Input, Chip, Badge, Switch, Avatar, ListRow, Card,
} from '@shared/components';
import { useTheme } from '@shared/hooks/useTheme';
import type { ButtonVariant } from '@shared/components';

const BUTTONS: ButtonVariant[] = ['primary', 'outline', 'soft', 'link', 'danger'];

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 py-6 border-b border-line">
      <span className="text-overline-12 font-sans tracking-[0.08em] uppercase text-muted">{title}</span>
      {children}
    </section>
  );
}

export default function UiKitRoute() {
  const [selected, setSelected] = useState('All');
  const [on, setOn] = useState(true);
  const { preference, setPreference } = useTheme();

  return (
    <Screen>
      <Text variant="heading-screen-24" as="h1">
        UI kit
      </Text>

      <Group title="Theme">
        <div className="flex flex-wrap items-center gap-2">
          {(['system', 'light', 'dark'] as const).map((p) => (
            <Chip key={p} selected={preference === p} onClick={() => setPreference(p)}>
              {p}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Buttons">
        <div className="flex flex-col gap-3">
          {BUTTONS.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
          <Button variant="primary" size="sm" fullWidth={false}>
            small
          </Button>
        </div>
      </Group>

      <Group title="Icon buttons">
        <div className="flex flex-wrap items-center gap-2">
          <IconButton label="Search" variant="soft"><Search size={20} /></IconButton>
          <IconButton label="Search" variant="outline"><Search size={20} /></IconButton>
          <IconButton label="Play" variant="dark"><Play size={20} /></IconButton>
        </div>
      </Group>

      <Group title="Input">
        <Input label="Email address" placeholder="you@example.com" icon={<Mail size={20} />} />
        <Input
          label="Email address"
          placeholder="you@example.com"
          icon={<Mail size={20} />}
          error="Enter a valid email address."
        />
      </Group>

      <Group title="Chips">
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Sermons', 'Worship'].map((c) => (
            <Chip key={c} selected={selected === c} onClick={() => setSelected(c)}>
              {c}
            </Chip>
          ))}
        </div>
      </Group>

      <Group title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">New</Badge>
          <Badge variant="neutral">Member</Badge>
          <Badge variant="muted">Draft</Badge>
          <Badge variant="danger">Overdue</Badge>
          <Badge variant="live" icon={<Radio size={12} />}>LIVE</Badge>
        </div>
      </Group>

      <Group title="Switch">
        <div className="flex flex-wrap items-center gap-2">
          <Switch checked={on} onCheckedChange={setOn} label="Notifications" />
          <Switch checked={!on} onCheckedChange={(v) => setOn(!v)} label="Downloads" />
        </div>
      </Group>

      <Group title="Avatars">
        <div className="flex flex-wrap items-center gap-2">
          <Avatar name="Sarah Johnson" size="sm" />
          <Avatar name="Ruth Bennett" size="md" />
          <Avatar name="Senior Pastor" size="lg" />
          <Avatar name="Charles Aondo" size="xl" />
        </div>
      </Group>

      <Group title="List rows">
        <ListRow
          icon={<Calendar size={20} />}
          title="Events"
          subtitle="Meetings & activities"
          divider
          onClick={() => undefined}
        />
        <ListRow
          icon={<Radio size={20} />}
          title="Notifications"
          subtitle="Push and email"
          trailing={<Switch checked={on} onCheckedChange={setOn} label="Notifications" />}
        />
      </Group>

      <Group title="Cards">
        <Card variant="dark">
          <Text variant="overline-12" color="accent">VERSE OF THE DAY</Text>
          <Text variant="heading-h3-18">
            &ldquo;But ye are a chosen generation, a royal priesthood.&rdquo;
          </Text>
          <Text variant="body-small-14" color="muted">1 Peter 2:9 · KJV</Text>
        </Card>
        <Card variant="accent">
          <Text variant="overline-12">DEVOTION · WEDNESDAY</Text>
          <Text variant="display-56" as="h2">Justified</Text>
        </Card>
        <Card variant="surface">
          <Text variant="scripture-18">
            I am justified by faith, fully accepted and declared righteous by God.
          </Text>
        </Card>
        <Card variant="tonal">
          <Text variant="heading-card-16">Tonal card</Text>
        </Card>
      </Group>
    </Screen>
  );
}
