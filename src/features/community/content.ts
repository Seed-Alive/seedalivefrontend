// Shapes the community API returns.

export interface GroupItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface Group {
  id: string;
  title: string;
  items: GroupItem[];
}

export interface Feed {
  active: string[];
  count: number;
  unread: number;
}
