import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDB } from './artistDB';
import { Artist, ArtistInfoDto } from './artist.interface';
import { v4 } from 'uuid';
import { TrackDB } from 'src/tracks/trackDB';
import { AlbumDB } from 'src/albums/albumDB';

@Injectable()
export class ArtistService {
  constructor(
    private artistDB: ArtistDB,
    private trackDB: TrackDB,
    private albumDB: AlbumDB,
  ) {}

  getAll(): Artist[] {
    return this.artistDB.getArtists();
  }

  create(dto: ArtistInfoDto): Artist {
    const newArtist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    return this.artistDB.createArtist(newArtist);
  }

  getArtist(id: string): Artist {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  updateArtist(id: string, dto: ArtistInfoDto): Artist {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedArtist = {
      ...artist,
      ...dto,
    };

    return this.artistDB.updateArtist(updatedArtist);
  }

  deleteArtist(id: string) {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.artistDB.deleteArtist(artist);
    this.trackDB.removeArtist(id);
    this.albumDB.removeArtist(id);
  }
}
