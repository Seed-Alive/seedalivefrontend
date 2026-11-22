import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { BrandMark, Sheet, Text } from '@shared/components';
import { Stage } from '../components';
import { LANGUAGES } from '../content';

const OPTION =
  'flex items-center justify-between gap-3 w-full min-h-14 px-4 rounded-md ' +
  'text-left text-heading-card-16 font-sans';

// The chosen language gets a soft green row and a tick.
const SELECTED = 'bg-accent-soft text-accent-ink';

// Lets someone pick the language the app and reading plans use.
export default function LanguageRoute() {
  const navigate = useNavigate();
  const [code, setCode] = useState('en');

  const choose = (next: string) => {
    setCode(next);
    navigate('/onboarding/welcome');
  };

  return (
    <Stage>
      <div className="flex-1 grid place-items-center opacity-90">
        <BrandMark size={140} className="text-accent" />
      </div>
      <Sheet grabber>
        <Text variant="heading-screen-24" as="h1">
          Language
        </Text>
        <Text variant="body-default-15" color="muted">
          The app and Bible reading plans switch to this language.
        </Text>
        <div className="flex flex-col">
          {LANGUAGES.map((lang) => {
            const selected = lang.code === code;
            return (
              <button
                key={lang.code}
                type="button"
                aria-pressed={selected}
                onClick={() => choose(lang.code)}
                className={[OPTION, selected ? SELECTED : 'text-ink'].join(' ')}
              >
                {lang.name}
                {selected && <Check size={20} aria-hidden />}
              </button>
            );
          })}
        </div>
      </Sheet>
    </Stage>
  );
}
