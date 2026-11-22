import { useNavigate, useParams } from 'react-router-dom';
import { Button, Chip, Sheet, Text } from '@shared/components';
import { Stage, Dots, TourArt } from '../components';
import { TOUR } from '../content';

// The three slides explaining what the app does.
export default function TourRoute() {
  const navigate = useNavigate();
  const { step } = useParams();
  const index = Math.min(Math.max(Number(step ?? 1), 1), TOUR.length) - 1;
  const slide = TOUR[index];
  const last = index === TOUR.length - 1;

  if (!slide) return null;

  const go = (next: number) => navigate(`/onboarding/tour/${next + 1}`);

  return (
    <Stage>
      <div className="flex items-center justify-between px-6 py-4">
        <Text variant="label-small-13" color="muted">
          {index + 1} of {TOUR.length}
        </Text>
        <Chip onClick={() => navigate('/onboarding/sign-up')}>Skip</Chip>
      </div>

      <TourArt index={index} />

      <Sheet>
        <Dots index={index} total={TOUR.length} />
        <div className="flex flex-col gap-3 pt-2 pb-6">
          <Text variant="heading-h1-30" as="h2">
            {slide.title}
          </Text>
          <Text variant="body-large-16" color="muted">
            {slide.body}
          </Text>
        </div>
        <div className="flex gap-3">
          {index > 0 && (
            <div className="flex-1">
              <Button variant="outline" onClick={() => go(index - 1)}>
                Back
              </Button>
            </div>
          )}
          <div className="flex-[2]">
            <Button onClick={() => (last ? navigate('/onboarding/sign-up') : go(index + 1))}>
              {last ? 'Get started' : 'Next'}
            </Button>
          </div>
        </div>
      </Sheet>
    </Stage>
  );
}
