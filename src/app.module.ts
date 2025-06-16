import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './users/user.module';
import { PrismaService } from './prisma/prisma.service';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';
import { FavsModule } from './favorites/favorites.module';
import { LoggerMiddleware } from './logging/logger.middleware';
import { UnexpectedErrorFilter } from './errors/exceptionFilter';
import { AuthModule } from './auth/auth.module';
import { LogsModule } from './logging/logs.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    LogsModule,
  ],
  controllers: [],
  providers: [
    UnexpectedErrorFilter,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
