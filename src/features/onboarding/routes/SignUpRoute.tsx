import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail } from 'lucide-react';
import { BrandMark, Button, IconButton, Input, Screen, Text } from '@shared/components';
import { api } from '@shared/api/client';
import { saveDraft } from '../signupDraft';

// Offers the three ways to create an account.
export default function SignUpRoute() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const continueWithEmail = async () => {
    setError(null);
    setBusy(true);
    try {
      await api('/auth/sign-up/start', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      saveDraft({ email: email.trim() });
      navigate('/onboarding/verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the code.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <div className="flex items-center justify-between pt-2 pb-6">
        <IconButton label="Go back" variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <Button variant="link" fullWidth={false} onClick={() => navigate('/sign-in')}>
          Sign in
        </Button>
      </div>

      <div className="grid place-items-center size-14 rounded-lg bg-primary text-on-primary mb-4">
        <BrandMark size={28} />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <Text variant="heading-h1-30" as="h1">
          Create your SeedAlive account
        </Text>
        <Text variant="body-large-16" color="muted">
          Save notes and highlights, follow reading plans and join your church community.
        </Text>
      </div>

      <div className="flex flex-col gap-3">
        <Button disabled>
          <img className="size-5" src="/brand/Apple.png" alt="" />
          Continue with Apple
        </Button>
        <Button variant="outline" disabled>
          <img className="size-5" src="/brand/Google.png" alt="" />
          Continue with Google
        </Button>

        <div className="flex items-center gap-4 py-2 text-muted before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
          <Text variant="body-small-14" color="muted">
            or
          </Text>
        </div>

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={<Mail size={20} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...(error ? { error } : {})}
        />
        <Button disabled={busy || !email} onClick={() => void continueWithEmail()}>
          {busy ? 'Sending code…' : 'Continue with email'}
        </Button>
      </div>

      <div className="mt-auto flex flex-col gap-2 items-center pt-8 text-center">
        <div className="flex items-center gap-1">
          <Text variant="body-default-15" color="muted">
            Already have an account?
          </Text>
          <Button variant="link" fullWidth={false} onClick={() => navigate('/sign-in')}>
            Sign in
          </Button>
        </div>
        <Text variant="caption-12" color="muted">
          By continuing you agree to SeedAlive&rsquo;s Terms of Service and Privacy Policy.
        </Text>
      </div>
    </Screen>
  );
}
