import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDB } from './trackDB';
import { TrackInfoDto, Track } from './track.interface';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private trackDB: TrackDB) {}

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

  getTrack(id: string): Track {
    const track = this.trackDB.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  updateTrack(id: string, dto: TrackInfoDto): Track {
    const track = this.trackDB.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = {
      ...track,
      ...dto,
    };

    return this.trackDB.updateTrack(updatedTrack);
  }
}
