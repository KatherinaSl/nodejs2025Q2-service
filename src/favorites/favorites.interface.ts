import { Album } from '../albums/album.interface';
import { Artist } from '../artists/artist.interface';
import { Track } from '../tracks/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
