import { Injectable } from '@nestjs/common';
import { Album } from './album.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumDB {
  constructor(private prisma: PrismaService) {}

  async getAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async createAlbum(album: Album): Promise<Album> {
    return await this.prisma.album.create({
      data: album,
    });
  }

  async getAlbum(id: string): Promise<Album> {
    return await this.prisma.album.findUnique({
      where: { id },
    });
  }

  async updateAlbum(album: Album): Promise<Album> {
    return await this.prisma.album.update({
      where: { id: album.id },
      data: album,
    });
  }

  async deleteAlbum(id: string) {
    return await this.prisma.album.delete({
      where: { id },
    });
  }

  async removeArtist(artistId: string) {
    this.prisma.album.updateMany({
      where: { artistId },
      data: {
        artistId: null,
      },
    });
  }
}
