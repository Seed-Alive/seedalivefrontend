// Shapes the media API returns.

export interface Album {
  id: string;
  title: string;
  meta: string;
  src: string;
  takenOn: string;
  isFeatured?: boolean;
}

export interface AlbumsPayload {
  featured: Album | null;
  albums: Album[];
}
