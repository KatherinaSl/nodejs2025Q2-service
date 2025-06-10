import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavService } from './favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoriteDB } from './favoritesDB';
import { AlbumDB } from 'src/albums/albumDB';
import { ArtistDB } from 'src/artists/artistDB';
import { TrackDB } from 'src/tracks/trackDB';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoriteDB,
    AlbumDB,
    ArtistDB,
    TrackDB,
    FavService,
    PrismaService,
  ],
})
export class FavsModule {}
