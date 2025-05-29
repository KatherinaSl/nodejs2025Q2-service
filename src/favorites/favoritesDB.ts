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
    this.tracks.splice(index, 1);
  }
}
