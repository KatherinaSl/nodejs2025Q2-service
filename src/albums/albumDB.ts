import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';

@Injectable()
export class AlbumDB {
  private albums: Map<string, Album>;

  constructor() {
    this.albums = new Map();
  }

  getAlbums(): Album[] {
    return [...this.albums.values()];
  }

  createAlbum(album: Album): Album {
    this.albums.set(album.id, album);
    return album;
  }

  getAlbum(id: string): Album {
    return this.albums.get(id);
  }

  updateAlbum(album: Album): Album {
    this.albums.set(album.id, album);
    return album;
  }

  deleteAlbum(id: string) {
    this.albums.delete(id);
  }

  removeArtist(artistId: string) {
    this.getAlbums()
      .filter((album) => album.artistId === artistId)
      .forEach((album) => (album.artistId = null));
  }
}
