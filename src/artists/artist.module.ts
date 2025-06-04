import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArtistDB } from './artistDB';
import { TrackDB } from 'src/tracks/trackDB';
import { AlbumDB } from 'src/albums/albumDB';

@Module({
  controllers: [ArtistsController],
  providers: [TrackDB, ArtistDB, AlbumDB, ArtistService, PrismaService],
})
export class ArtistModule {}
