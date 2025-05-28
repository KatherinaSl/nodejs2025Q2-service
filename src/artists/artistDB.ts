import { Injectable } from '@nestjs/common';
import { Artist, ArtistInfoDto } from './artist.interface';
import { v4 } from 'uuid';

@Injectable()
export class ArtistDB {
  private artists: Map<string, Artist>;

  constructor() {
    this.artists = new Map();
  }

  getArtists(): Artist[] {
    return [...this.artists.values()];
  }

  createArtist(dto: ArtistInfoDto): Artist {
    const newArtist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    this.artists.set(newArtist.id, newArtist);

    return newArtist;
  }

  getArtist(id: string): Artist {
    return this.artists.get(id);
  }

  updateArtistInfo(artist: Artist, newInfo: ArtistInfoDto): Artist {
    artist.name = newInfo.name;
    artist.grammy = newInfo.grammy;

    this.artists.set(artist.id, artist);
    return artist;
  }

  deleteArtist(artist: Artist) {
    this.artists.delete(artist.id);
  }
}
