import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from './track.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrackDB } from './trackDB';

@Module({
  controllers: [TracksController],
  providers: [TrackDB, TrackService, PrismaService],
})
export class TrackModule {}
