import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDB } from 'src/artists/artistDB';
import { AlbumDB } from './albumDB';
import { Album, AlbumInfoDto } from './album.interface';
import { v4 } from 'uuid';
import { TrackDB } from 'src/tracks/trackDB';

@Injectable()
export class AlbumService {
  constructor(
    private artistDB: ArtistDB,
    private albumDB: AlbumDB,
    private trackDB: TrackDB,
  ) {}

  create(dto: AlbumInfoDto): Album {
    const newAlbum = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: this.artistDB.isValidArtist(dto.artistId) ? dto.artistId : null,
    };
    return this.albumDB.createAlbum(newAlbum);
  }

  getAll(): Album[] {
    return this.albumDB.getAlbums();
  }

  getAlbum(id: string): Album {
    const album = this.albumDB.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  updateAlbum(id: string, dto: AlbumInfoDto): Album {
    const album = this.albumDB.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = {
      ...album,
      ...dto,
    };

    return this.albumDB.updateAlbum(updatedAlbum);
  }

  deleteAlbum(id: string) {
    const album = this.albumDB.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.albumDB.deleteAlbum(id);
    this.trackDB.removeAlbum(id);
  }
}
