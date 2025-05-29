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

  //   changeTracksArtistId(artistId: string) {
  //     // this.tracks.forEach((track) => {
  //     //   if (track.artistId === artistId) {
  //     //     track.artistId = null;
  //     //     this.tracks.set(track.id, track);
  //     //   }
  //     // });
  //     const arrayOfTracks = [...this.tracks.values()];
  //     arrayOfTracks
  //       .filter((track) => track.artistId === artistId)
  //       .forEach((track) => (track.artistId = null));
  //     // track.artistId = null;
  //     // this.tracks.set(track.id, track);
  //   }
}
