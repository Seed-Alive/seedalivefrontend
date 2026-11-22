import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { BrandMark, Button, Chip, Text } from '@shared/components';
import { Stage } from '../components';

// The first real choice: sign up, sign in, or look around as a guest.
export default function WelcomeRoute() {
  const navigate = useNavigate();

  return (
    <Stage>
      <div className="flex justify-end pt-4 px-6">
        <Chip onClick={() => navigate('/onboarding/language')}>
          English
          <ChevronDown size={16} aria-hidden />
        </Chip>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <BrandMark size={120} className="text-accent" />
        <div className="flex flex-col gap-3">
          <Text variant="overline-12" color="muted">
            ASSEMBLIES OF GOD CHURCH, SHOGUNLE
          </Text>
          <Text variant="heading-h1-30" as="h1">
            Welcome to SeedAlive
          </Text>
          <Text variant="body-large-16" color="muted">
            Grow in faith every day — Scripture, worship and community in one place.
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-6 pb-[calc(var(--space-24)+env(safe-area-inset-bottom))]">
        <Button onClick={() => navigate('/onboarding/tour')}>Get started</Button>
        <Button variant="outline" onClick={() => navigate('/onboarding/sign-up')}>
          I already have an account
        </Button>
        <Button variant="link" onClick={() => navigate('/')}>
          Continue as guest
        </Button>
        <div className="text-center">
          <Text variant="caption-12" color="muted">
            By continuing you agree to our Terms and Privacy Policy.
          </Text>
        </div>
      </div>
    </Stage>
  );
}
