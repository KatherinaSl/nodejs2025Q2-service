import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDB } from './albumDB';
import { Album, AlbumInfoDto } from './album.interface';
import { v4 } from 'uuid';
import { TrackDB } from 'src/tracks/trackDB';
import { FavService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private albumDB: AlbumDB,
    private trackDB: TrackDB,
    private favService: FavService,
  ) {}

  create(dto: AlbumInfoDto): Album {
    const newAlbum = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    return this.albumDB.createAlbum(newAlbum);
  }

  getAll(): Album[] {
    return this.albumDB.getAlbums();
  }

  private checkAlbumExists(id: string): Album {
    const album = this.albumDB.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  getAlbum(id: string): Album {
    return this.checkAlbumExists(id);
  }

  updateAlbum(id: string, dto: AlbumInfoDto): Album {
    const album = this.checkAlbumExists(id);

    const updatedAlbum = {
      ...album,
      ...dto,
    };

    return this.albumDB.updateAlbum(updatedAlbum);
  }

  deleteAlbum(id: string) {
    this.checkAlbumExists(id);

    this.albumDB.deleteAlbum(id);
    this.trackDB.removeAlbum(id);
    this.favService.removeAlbumIdFromFavs(id);
  }
}
