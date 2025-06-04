import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, AlbumModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
