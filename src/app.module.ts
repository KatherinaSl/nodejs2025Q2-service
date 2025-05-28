import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserDB } from './users/userDB';
import { ArtistsController } from './artists/artists.controller';
import { ArtistDB } from './artists/artistDB';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController, UsersController, ArtistsController],
  providers: [
    AppService,
    UserDB,
    ArtistDB,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
