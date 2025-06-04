import { Injectable } from '@nestjs/common';
import { Track } from './track.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackDB {
  constructor(private prisma: PrismaService) {}

  async getTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async createTrack(track: Track): Promise<Track> {
    return await this.prisma.track.create({
      data: track,
    });
  }

  async getTrack(id: string): Promise<Track> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  async updateTrack(track: Track): Promise<Track> {
    return await this.prisma.track.update({
      where: { id: track.id },
      data: track,
    });
  }

  async deleteTrack(id: string) {
    return await this.prisma.track.delete({
      where: { id },
    });
  }
}
