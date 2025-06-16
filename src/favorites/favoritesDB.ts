import { Injectable } from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoriteDB {
  constructor(private prisma: PrismaService) {}

  async getAllFavs(): Promise<FavoritesResponse> {
    const albums = await this.prisma.album.findMany({
      where: {
        favAlbum: { isNot: null },
      },
    });
    const artists = await this.prisma.artist.findMany({
      where: {
        favArtist: { isNot: null },
      },
    });
    const tracks = await this.prisma.track.findMany({
      where: {
        favTrack: { isNot: null },
      },
    });

    return { artists, albums, tracks };
  }

  addTrack(trackId: string) {
    return this.prisma.favoriteTrack.create({
      data: { trackId },
    });
  }

  getTrack(trackId: string) {
    return this.prisma.favoriteTrack.findUnique({
      where: { trackId },
    });
  }

  deleteTrack(trackId: string) {
    return this.prisma.favoriteTrack.delete({
      where: { trackId },
    });
  }

  addAlbum(albumId: string) {
    return this.prisma.favoriteAlbum.create({
      data: { albumId },
    });
  }

  getAlbum(albumId: string) {
    return this.prisma.favoriteAlbum.findUnique({
      where: { albumId },
    });
  }

  deleteAlbum(albumId: string) {
    return this.prisma.favoriteAlbum.delete({
      where: { albumId },
    });
  }

  addArtist(artistId: string) {
    return this.prisma.favoriteArtist.create({
      data: { artistId },
    });
  }

  getArtist(artistId: string) {
    return this.prisma.favoriteArtist.findUnique({
      where: { artistId },
    });
  }

  deleteArtist(artistId: string) {
    return this.prisma.favoriteArtist.delete({
      where: { artistId },
    });
  }
}
