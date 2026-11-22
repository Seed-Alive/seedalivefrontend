import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, Download, Folder, Search } from 'lucide-react';
import { Button, IconButton, Input, Screen, Text } from '@shared/components';
import { useApi } from '@shared/api/useApi';
import type { BibleVersion } from '../content';

// Lists the Bible translations and which ones are saved for offline use.
export default function VersionsRoute() {
  const navigate = useNavigate();
  const { data, loading } = useApi<BibleVersion[]>('/bible/versions');
  const versions = data ?? [];

  return (
    <Screen>
      <div className="flex items-center gap-3 pt-2 pb-4">
        <IconButton label="Go back" variant="soft" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <span className="flex flex-col">
          <Text variant="heading-screen-24" as="h1">
            Bible versions
          </Text>
          <Text variant="body-small-14" color="muted">
            Download once, read offline anywhere
          </Text>
        </span>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-secondary-soft mb-4">
        <span className="flex items-center gap-2">
          <Folder size={18} aria-hidden />
          <Text variant="label-default-15" color="accent-ink" className="flex-1">
            Storage used
          </Text>
          <Text variant="label-small-13" color="accent-ink">
            4.4 MB of 64 GB
          </Text>
        </span>
        <span className="block h-1.5 rounded-full bg-line overflow-hidden">
          <span className="block h-full bg-primary" style={{ width: '8%' }} />
        </span>
      </div>

      <Input label="" placeholder="Search by name or language" icon={<Search size={20} />} />

      <Text variant="overline-12" color="muted" className="py-6">
        {loading ? 'LOADING VERSIONS' : `AVAILABLE VERSIONS (${versions.length})`}
      </Text>

      <div className="flex flex-col gap-2">
        {versions.map((v) => (
          <div key={v.code} className="flex items-center gap-3 p-3 rounded-lg bg-surface inset-ring-1 inset-ring-line">
            <span className="grid place-items-center size-11 flex-none rounded-md bg-secondary-soft">
              <Text variant="label-small-13" color="accent-ink" as="span">
                {v.code}
              </Text>
            </span>
            <span className="flex-1 min-w-0 flex flex-col">
              <Text variant="heading-card-16" clamp={1}>
                {v.name}
              </Text>
              <Text variant="body-small-14" color="muted">
                {v.language}
                {v.sizeMb ? ` · ${v.sizeMb} MB` : ''}
              </Text>
            </span>
            {v.code === 'KJV' ? (
              <Button variant="soft" size="sm" fullWidth={false}>
                <Check size={16} />
                Open
              </Button>
            ) : (
              <Button variant="outline" size="sm" fullWidth={false}>
                <Download size={16} />
                Get
              </Button>
            )}
          </div>
        ))}
      </div>

      <Text variant="caption-12" color="muted" className="py-6">
        Versions shown are in the public domain. Licensed translations can be added by your church
        admin.
      </Text>
    </Screen>
  );
}
