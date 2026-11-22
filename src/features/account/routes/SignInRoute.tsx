import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { BrandMark, Button, Checkbox, Input, Screen, Text } from '@shared/components';
import { useAuth } from '@shared/hooks/useAuth';

const SOCIALS = [
  { id: 'facebook', src: '/brand/Facebook.png', label: 'Facebook' },
  { id: 'google', src: '/brand/Google.png', label: 'Google' },
  { id: 'apple', src: '/brand/Apple.png', label: 'Apple' },
];

// Signs an existing member back in, against the real API.
export default function SignInRoute() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stayed, setStayed] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signIn(email.trim(), password);
      navigate('/account', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign you in.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <form onSubmit={submit}>
        <div className="flex flex-col items-center gap-3 py-6">
          <span className="grid place-items-center size-16 rounded-lg bg-primary text-on-primary">
            <BrandMark size={32} />
          </span>
          <Text variant="heading-h1-30" as="h1" align="center">
            Welcome back
          </Text>
          <Text variant="body-large-16" color="muted" align="center">
            Sign in to continue growing with your church family.
          </Text>
        </div>

        <div className="flex flex-col gap-4 pb-4">
          <Input
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            icon={<Mail size={20} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            icon={<Lock size={20} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            {...(error ? { error } : {})}
          />
        </div>

        <div className="whitespace-nowrap flex items-center justify-between gap-3 pb-4">
          <Checkbox checked={stayed} onCheckedChange={setStayed} label="Keep me signed in" />
          <Button variant="link" fullWidth={false} type="button">
            Forgot password?
          </Button>
        </div>

        <Button type="submit" disabled={busy || !email || !password}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="flex items-center gap-4 py-6 text-muted before:content-[''] before:flex-1 before:h-px before:bg-line after:content-[''] after:flex-1 after:h-px after:bg-line">
        <Text variant="body-small-14" color="muted">
          Or sign in with
        </Text>
      </div>

      <div className="flex justify-center gap-3">
        {SOCIALS.map((s) => (
          <button key={s.id} type="button" className="grid place-items-center w-16 h-14 rounded-lg bg-surface inset-ring-1 inset-ring-line" aria-label={s.label}>
            <img src={s.src} width={24} alt="" />
          </button>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center gap-1 py-6">
        <Text variant="body-default-15" color="muted">
          New to SeedAlive?
        </Text>
        <Button variant="link" fullWidth={false} onClick={() => navigate('/onboarding/sign-up')}>
          Create an account
        </Button>
      </div>
    </Screen>
  );
}
