import { Injectable } from '@nestjs/common';
import { Track } from './track.interface';

@Injectable()
export class TrackDB {
  private tracks: Map<string, Track>;

  constructor() {
    this.tracks = new Map();
  }

  getTracks(): Track[] {
    return [...this.tracks.values()];
  }

  createTrack(track: Track): Track {
    this.tracks.set(track.id, track);
    return track;
  }

  getTrack(id: string): Track {
    return this.tracks.get(id);
  }

  updateTrack(track: Track): Track {
    this.tracks.set(track.id, track);
    return track;
  }

  deleteTrack(id: string) {
    this.tracks.delete(id);
  }

  removeAlbum(albumId: string) {
    this.getTracks()
      .filter((track) => track.albumId === albumId)
      .forEach((track) => (track.albumId = null));
  }

  removeArtist(artistId: string) {
    this.getTracks()
      .filter((track) => track.artistId === artistId)
      .forEach((track) => (track.artistId = null));
  }
}
