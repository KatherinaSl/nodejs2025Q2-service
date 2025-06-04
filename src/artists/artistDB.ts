import { Injectable } from '@nestjs/common';
import { Artist } from './artist.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistDB {
  constructor(private prisma: PrismaService) {}

  async getArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async createArtist(artist: Artist): Promise<Artist> {
    return await this.prisma.artist.create({
      data: artist,
    });
  }

  async getArtist(id: string): Promise<Artist> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async updateArtist(artist: Artist): Promise<Artist> {
    return await this.prisma.artist.update({
      where: { id: artist.id },
      data: artist,
    });
  }

  async deleteArtist(artist: Artist) {
    return await this.prisma.artist.delete({
      where: { id: artist.id },
    });
  }
}
