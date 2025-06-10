import { Module } from '@nestjs/common';
import { AlbumsController } from './album.controller';
import { AlbumService } from './album.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumDB } from './albumDB';
import { TrackDB } from 'src/tracks/trackDB';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumDB, TrackDB, AlbumService, PrismaService],
})
export class AlbumModule {}
