import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button, Screen, Text } from '@shared/components';
import { api } from '@shared/api/client';
import { useAuth } from '@shared/hooks/useAuth';
import type { AuthUser } from '@shared/hooks/useAuth';
import { StepHeader, OtpInput } from '../components';
import { readDraft, saveDraft } from '../signupDraft';

const RESEND_SECONDS = 42;

// Takes the six-digit code sent by email.
export default function VerifyEmailRoute() {
  const navigate = useNavigate();
  const { acceptSession } = useAuth();
  const [code, setCode] = useState('');
  const [left, setLeft] = useState(RESEND_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const email = readDraft().email;

  // Without an address there is nothing to verify, so start over.
  useEffect(() => {
    if (!email) navigate('/onboarding/sign-up', { replace: true });
  }, [email, navigate]);

  useEffect(() => {
    if (left === 0) return;
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const verify = async () => {
    setError(null);
    setBusy(true);
    try {
      const data = await api<{ token: string; user: AuthUser }>('/auth/sign-up/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });
      acceptSession(data.token, data.user);
      navigate('/onboarding/interests');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'That code did not work.');
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setError(null);
    await api('/auth/sign-up/start', { method: 'POST', body: JSON.stringify({ email }) });
    saveDraft({ email });
    setLeft(RESEND_SECONDS);
    setCode('');
  };

  const clock = `0:${String(left).padStart(2, '0')}`;

  return (
    <Screen>
      <StepHeader step={1} />

      <div className="grid place-items-center size-14 rounded-lg bg-secondary-soft mb-4">
        <Mail size={24} aria-hidden />
      </div>

      <div className="flex flex-col gap-2 mb-6">
        <Text variant="heading-h1-30" as="h1">
          Check your email
        </Text>
        <Text variant="body-large-16" color="muted">
          We sent a 6-digit code to {email}. Enter it below to confirm it&rsquo;s you.
        </Text>
      </div>

      <OtpInput value={code} onChange={setCode} />

      {error && (
        <Text variant="body-small-14" color="danger" className="flex items-center gap-2 pt-4">
          {error}
        </Text>
      )}

      <div className="flex items-center gap-2 pt-4">
        <Text variant="body-small-14" color="muted">
          Didn&rsquo;t get it?
        </Text>
        {left > 0 ? (
          <Text variant="label-default-15">Resend in {clock}</Text>
        ) : (
          <Button variant="link" fullWidth={false} onClick={() => void resend()}>
            Resend now
          </Button>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-8">
        <Button disabled={busy || code.length < 6} onClick={() => void verify()}>
          {busy ? 'Checking…' : 'Verify email'}
        </Button>
        <Button variant="link" onClick={() => navigate('/onboarding/sign-up')}>
          Use a different email
        </Button>
      </div>
    </Screen>
  );
}
