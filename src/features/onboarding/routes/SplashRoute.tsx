import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandMark, Text } from '@shared/components';
import { Stage } from '../components';

// The opening screen, which moves on to the language picker by itself.
export default function SplashRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding/language', { replace: true }), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Stage>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <BrandMark size={120} className="text-accent" />
        <div className="flex flex-col gap-2">
          <Text variant="display-56" as="h1" color="ink">
            SeedAlive
          </Text>
          <Text variant="body-large-16" color="muted">
            By Assemblies of God Church, Shogunle
          </Text>
        </div>
      </div>
      <div className="pb-[calc(var(--space-24)+env(safe-area-inset-bottom))] text-center">
        <Text variant="caption-12" color="muted">
          Design &amp; Developed by CD Studios
        </Text>
      </div>
    </Stage>
  );
}
