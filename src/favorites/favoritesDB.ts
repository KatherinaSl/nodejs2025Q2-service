import { Injectable } from '@nestjs/common';
import { Favorites } from './favorites.interface';

@Injectable()
export class FavoriteDB {
  private artists: string[];
  private albums: string[];
  private tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  getAllFavs(): Favorites {
    return {
      artists: this.artists,
      albums: this.albums,
      tracks: this.tracks,
    };
  }

  addTrack(trackId: string) {
    this.tracks.push(trackId);
  }

  deleteTrack(trackId: string) {
    const index = this.tracks.indexOf(trackId);
    if (index !== -1) {
      this.tracks.splice(index, 1);
    }
  }

  addAlbum(albumId: string) {
    this.albums.push(albumId);
  }

  deleteAlbum(albumId: string) {
    const index = this.albums.indexOf(albumId);
    if (index !== -1) {
      this.albums.splice(index, 1);
    }
  }

  addArtist(artistId: string) {
    this.artists.push(artistId);
  }

  deleteArtist(artistId: string) {
    const index = this.artists.indexOf(artistId);
    if (index !== -1) {
      this.artists.splice(index, 1);
    }
  }
}
