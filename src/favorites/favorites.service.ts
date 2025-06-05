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

  getAll(): Promise<FavoritesResponse> {
    return this.favoriteDB.getAllFavs();
  }

  async addTrack(trackId: string) {
    const track = await this.tracksDB.getTrack(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    return this.favoriteDB.addTrack(trackId);
  }

  async deleteTrack(trackId: string) {
    const favTrackId = await this.favoriteDB.getTrack(trackId);
    if (!favTrackId) {
      throw new NotFoundException('Track not found in favorites');
    }

    return this.favoriteDB.deleteTrack(trackId);
  }

  async addAlbum(albumId: string) {
    const album = await this.albumsDB.getAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    return this.favoriteDB.addAlbum(albumId);
  }

  async deleteAlbum(albumId: string) {
    const favAlbumId = await this.favoriteDB.getAlbum(albumId);
    if (!favAlbumId) {
      throw new NotFoundException('Album not found in favorites');
    }

    return this.favoriteDB.deleteAlbum(albumId);
  }

  async addArtist(artistId: string) {
    const artist = await this.artistsDB.getArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    return this.favoriteDB.addArtist(artistId);
  }

  async deleteArtist(artistId: string) {
    const favArtistId = await this.favoriteDB.getArtist(artistId);
    if (!favArtistId) {
      throw new NotFoundException('Artist not found in favorites');
    }

    return this.favoriteDB.deleteArtist(artistId);
  }
}
