import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDB } from './trackDB';
import { TrackInfoDto, Track } from './track.interface';
import { v4 } from 'uuid';
import { FavService } from 'src/favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    private trackDB: TrackDB,
    private favService: FavService,
  ) {}

  getAll(): Track[] {
    return this.trackDB.getTracks();
  }

  create(dto: TrackInfoDto): Track {
    const newTrack = {
      id: v4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    return this.trackDB.createTrack(newTrack);
  }

  private checkTrackExists(id: string): Track {
    const track = this.trackDB.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  getTrack(id: string): Track {
    return this.checkTrackExists(id);
  }

  updateTrack(id: string, dto: TrackInfoDto): Track {
    const track = this.checkTrackExists(id);

    const updatedTrack = {
      ...track,
      ...dto,
    };

    return this.trackDB.updateTrack(updatedTrack);
  }

  deleteTrack(id: string) {
    this.checkTrackExists(id);
    this.trackDB.deleteTrack(id);
    this.favService.removeTrackIdFromFavs(id);
  }
}
