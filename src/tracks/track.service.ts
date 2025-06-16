import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackDB } from './trackDB';
import { TrackInfoDto, Track } from './track.interface';
import { v4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private trackDB: TrackDB) {}

  getAll(): Promise<Track[]> {
    return this.trackDB.getTracks();
  }

  create(dto: TrackInfoDto): Promise<Track> {
    const newTrack = {
      id: v4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    return this.trackDB.createTrack(newTrack);
  }

  private async checkTrackExists(id: string): Promise<Track> {
    const track = await this.trackDB.getTrack(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  getTrack(id: string): Promise<Track> {
    return this.checkTrackExists(id);
  }

  async updateTrack(id: string, dto: TrackInfoDto): Promise<Track> {
    const track = await this.checkTrackExists(id);

    const updatedTrack = {
      ...track,
      ...dto,
    };

    return this.trackDB.updateTrack(updatedTrack);
  }

  async deleteTrack(id: string) {
    await this.checkTrackExists(id);
    await this.trackDB.deleteTrack(id);
  }
}
