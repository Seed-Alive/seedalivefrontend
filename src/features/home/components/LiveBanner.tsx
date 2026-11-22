import { useNavigate } from 'react-router-dom';
import { Radio } from 'lucide-react';
import { Badge, Button, Text } from '@shared/components';

export interface LiveBannerProps {
  title: string;
}

// Shows that a service is streaming right now.
export function LiveBanner({ title }: LiveBannerProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface inset-ring-1 inset-ring-line">
      <Badge variant="live" icon={<Radio size={12} />}>
        LIVE
      </Badge>
      <span className="flex-1 min-w-0 flex flex-col gap-0.5">
        <Text variant="label-default-15" clamp={1}>
          {title}
        </Text>
      </span>
      <Button size="sm" fullWidth={false} onClick={() => navigate('/live')}>
        Join
      </Button>
    </div>
  );
}
