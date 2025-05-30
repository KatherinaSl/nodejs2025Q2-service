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

  removeTrackIdFromFavs(trackId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    if (favsId.tracks.includes(trackId)) {
      const idx = favsId.tracks.indexOf(trackId);
      favsId.tracks.splice(idx, 1);
    }
  }

  addAlbum(albumId: string) {
    const album = this.albumsDB.getAlbum(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    this.favoriteDB.addAlbum(albumId);
  }

  deleteAlbum(albumId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    const favAlbumId = favsId.albums.find((id) => id === albumId);
    if (!favAlbumId) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favoriteDB.deleteAlbum(albumId);
  }

  removeAlbumIdFromFavs(albumId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    if (favsId.albums.includes(albumId)) {
      const idx = favsId.albums.indexOf(albumId);
      favsId.albums.splice(idx, 1);
    }
  }

  addArtist(artistId: string) {
    const artist = this.artistsDB.getArtist(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    this.favoriteDB.addArtist(artistId);
  }

  deleteArtist(artistId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    const favArtistId = favsId.artists.find((id) => id === artistId);
    if (!favArtistId) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favoriteDB.deleteArtist(artistId);
  }

  removeArtistIdFromFavs(artistId: string) {
    const favsId = this.favoriteDB.getAllFavs();
    if (favsId.artists.includes(artistId)) {
      const idx = favsId.artists.indexOf(artistId);
      favsId.artists.splice(idx, 1);
    }
  }
}
