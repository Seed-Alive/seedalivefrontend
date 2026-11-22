// Shapes the live service API returns.

export interface ChurchService {
  id: string;
  title: string;
  church: string;
  speaker: string;
  place: string;
  startsAt: string;
  delaySeconds: number;
  watching: number;
  isLive: boolean;
}

export interface ServiceAction {
  id: string;
  label: string;
}

export interface ServiceStream {
  id: string;
  kind: string;
  provider: string | null;
  externalId: string | null;
  title: string;
  detail: string;
  badge: string | null;
}

export interface LivePayload {
  service: ChurchService | null;
  actions: ServiceAction[];
  streams: ServiceStream[];
}
