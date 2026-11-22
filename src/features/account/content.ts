// Shapes the identity API returns for the profile screen.

export interface Stat {
  value: string;
  label: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  subtitle: string;
}

export interface Profile {
  user: {
    id: string;
    name: string;
    email: string;
    campus: string;
    memberSince: string;
  };
  stats: Stat[];
  library: LibraryItem[];
}
