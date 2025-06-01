import { Injectable } from '@nestjs/common';
import { Artist } from './artist.interface';

@Injectable()
export class ArtistDB {
  private artists: Map<string, Artist>;

  constructor() {
    this.artists = new Map();
  }

  getArtists(): Artist[] {
    return [...this.artists.values()];
  }

  createArtist(artist: Artist): Artist {
    this.artists.set(artist.id, artist);

    return artist;
  }

  getArtist(id: string): Artist {
    return this.artists.get(id);
  }

  updateArtist(artist: Artist): Artist {
    this.artists.set(artist.id, artist);
    return artist;
  }

  deleteArtist(artist: Artist) {
    this.artists.delete(artist.id);
  }
}
