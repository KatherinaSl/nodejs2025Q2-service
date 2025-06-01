import { ClassSerializerInterceptor, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UserDB } from './users/userDB';
import { ArtistsController } from './artists/artists.controller';
import { ArtistDB } from './artists/artistDB';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TracksController } from './tracks/tracks.controller';
import { TrackDB } from './tracks/trackDB';
import { AlbumDB } from './albums/albumDB';
import { AlbumsController } from './albums/album.controller';
import { AlbumService } from './albums/album.service';
import { TrackService } from './tracks/track.service';
import { ArtistService } from './artists/artist.service';
import { UserService } from './users/user.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavService } from './favorites/favorites.service';
import { FavoriteDB } from './favorites/favoritesDB';

@Module({
  imports: [],
  controllers: [
    // AppController,
    UsersController,
    AlbumsController,
    TracksController,
    ArtistsController,
    FavoritesController,
  ],
  providers: [
    // AppService,
    UserService,
    AlbumService,
    TrackService,
    ArtistService,
    FavService,
    UserDB,
    AlbumDB,
    TrackDB,
    ArtistDB,
    FavoriteDB,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
