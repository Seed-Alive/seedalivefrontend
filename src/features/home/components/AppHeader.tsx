import { useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { BrandMark, IconButton, Text } from '@shared/components';

export interface AppHeaderProps {
  greeting: string;
  unread?: number;
  onSearch?: () => void;
}

// The SeedAlive bar across the top of the home screen.
export function AppHeader({ greeting, unread = 0, onSearch }: AppHeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-3 py-3">
      <span className="grid place-items-center size-11 flex-none rounded-md bg-primary text-on-primary">
        <BrandMark size={24} />
      </span>
      <span className="flex-1 min-w-0 flex flex-col">
        <Text variant="heading-h2-20">SeedAlive</Text>
        <Text variant="body-small-14" color="muted">
          {greeting}
        </Text>
      </span>
      <div className="flex gap-2">
        <IconButton label="Search" variant="soft" onClick={onSearch}>
          <Search size={20} />
        </IconButton>
        <span className="relative">
          <IconButton label="Notifications" variant="soft" onClick={() => navigate('/notifications')}>
            <Bell size={20} />
          </IconButton>
          {unread > 0 && <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 grid place-items-center rounded-full bg-danger text-[#fff] text-[11px] font-bold">{unread}</span>}
        </span>
      </div>
    </header>
  );
}
