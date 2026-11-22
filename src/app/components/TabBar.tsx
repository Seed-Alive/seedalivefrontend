import { NavLink } from 'react-router-dom';
import { House, BookOpen, CirclePlay, Users, User, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const BAR =
  'sticky bottom-0 z-10 grid grid-cols-5 w-full max-w-[480px] mx-auto ' +
  'bg-surface border-t border-line pb-[env(safe-area-inset-bottom)]';

const TAB =
  'flex flex-col items-center gap-1 py-2 text-label-small-13 font-sans';

interface Tab {
  to: string;
  label: string;
  Icon: LucideIcon;
}

const TABS: readonly Tab[] = [
  { to: '/', label: 'Home', Icon: House },
  { to: '/bible', label: 'Bible', Icon: BookOpen },
  { to: '/media', label: 'Media', Icon: CirclePlay },
  { to: '/community', label: 'Community', Icon: Users },
  { to: '/account', label: 'Profile', Icon: User },
];

function TabIcon({ tab, active }: { tab: Tab; active: boolean }) {
  if (tab.label === 'Media' && active) {
    // The selected Media icon is a filled circle with the arrow cut out.
    return (
      <span className="grid place-items-center size-6 rounded-full bg-ink text-surface">
        <Play size={12} fill="currentColor" strokeWidth={0} aria-hidden />
      </span>
    );
  }
  const { Icon } = tab;
  return <Icon size={24} fill={active ? 'currentColor' : 'none'} aria-hidden />;
}

export function TabBar() {
  return (
    <nav className={BAR} aria-label="Primary">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          // The selected tab turns solid black, never green.
          className={({ isActive }) => [TAB, isActive ? 'text-ink' : 'text-muted'].join(' ')}
        >
          {({ isActive }) => (
            <>
              <TabIcon tab={tab} active={isActive} />
              {tab.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
