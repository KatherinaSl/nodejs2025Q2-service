import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from './artist.interface';
import { TrackDB } from 'src/tracks/trackDB';

@Injectable()
export class ArtistDB {
  private artists: Map<string, Artist>;

  constructor(@Inject(forwardRef(() => TrackDB)) private trackDB: TrackDB) {
    this.artists = new Map();
  }

  isValidArtist(id: string): boolean {
    return this.artists.has(id);
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
    // this.trackDB.changeTracksArtistId(artist.id);
  }
}
