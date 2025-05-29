import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteDB } from './favoritesDB';
import { FavoritesResponse } from './favorites.interface';
import { AlbumDB } from 'src/albums/albumDB';
import { ArtistDB } from 'src/artists/artistDB';
import { TrackDB } from 'src/tracks/trackDB';

@Injectable()
export class FavService {
  constructor(
    private favoriteDB: FavoriteDB,
    private albumsDB: AlbumDB,
    private artistsDB: ArtistDB,
    private tracksDB: TrackDB,
  ) {}

  getAll(): FavoritesResponse {
    const favsId = this.favoriteDB.getAllFavs();
    const albums = favsId.albums.map((albumId) =>
      this.albumsDB.getAlbum(albumId),
    );
    const tracks = favsId.tracks.map((trackId) =>
      this.tracksDB.getTrack(trackId),
    );
    const artists = favsId.artists.map((artistId) =>
      this.artistsDB.getArtist(artistId),
    );

    return { artists, albums, tracks };
  }

  addTrack(trackId: string) {
    const track = this.tracksDB.getTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    this.favoriteDB.addTrack(trackId);
  }

  deleteTrack(trackId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    const favTrackId = favsId.tracks.find((id) => id === trackId);
    if (!favTrackId) {
      throw new NotFoundException('Track not found in favorites');
    }

    this.favoriteDB.deleteTrack(trackId);
  }
}
