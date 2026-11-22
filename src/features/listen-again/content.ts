// Shapes the recordings API returns.

export interface Recording {
  id: string;
  title: string;
  category: string;
  meta: string;
  recordedOn: string;
  listens: number;
}

export interface RecordingsPayload {
  latest: Recording | null;
  recordings: Recording[];
}

// Category chips, fixed because they are how the church files its services.
export const FILTERS: readonly string[] = [
  'All recordings',
  'Sunday',
  'Midweek',
  'Prayer',
  'Special',
];
