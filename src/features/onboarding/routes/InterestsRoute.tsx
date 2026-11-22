import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MapPin } from 'lucide-react';
import { Button, Chip, Input, Screen, Text } from '@shared/components';
import { StepHeader } from '../components';
import { INTERESTS } from '../content';
import { saveDraft } from '../signupDraft';

// Collects the topics used to tailor verses, plans and sermons.
export default function InterestsRoute() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string[]>(['Prayer', 'Bible study', 'Sermons']);

  const toggle = (topic: string) =>
    setPicked((current) =>
      current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic]
    );

  return (
    <Screen>
      <StepHeader step={2} />

      <div className="flex flex-col gap-2 mb-6">
        <Text variant="heading-h1-30" as="h1">
          What would you like to grow in?
        </Text>
        <Text variant="body-large-16" color="muted">
          Pick a few topics — we&rsquo;ll tailor your daily verse, plans and sermons.
        </Text>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {INTERESTS.map((topic) => (
          <Chip key={topic} selected={picked.includes(topic)} onClick={() => toggle(topic)}>
            {topic}
          </Chip>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Input
          label="Your home branch"
          defaultValue="AGC Shogunle · Lagos"
          icon={<MapPin size={20} />}
        />
        <Input
          label="Preferred Bible version"
          defaultValue="King James Version (KJV)"
          icon={<BookOpen size={20} />}
        />
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-8">
        <Button
          onClick={() => {
            saveDraft({ interests: picked });
            navigate('/onboarding/notifications');
          }}
        >
          Continue
        </Button>
        <Button
          variant="link"
          onClick={() => {
            saveDraft({ interests: [] });
            navigate('/onboarding/notifications');
          }}
        >
          Skip for now
        </Button>
      </div>
    </Screen>
  );
}
