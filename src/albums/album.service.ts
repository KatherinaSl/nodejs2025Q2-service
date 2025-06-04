import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumDB } from './albumDB';
import { Album, AlbumInfoDto } from './album.interface';
import { v4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private albumDB: AlbumDB) {}

  create(dto: AlbumInfoDto): Promise<Album> {
    const newAlbum = {
      id: v4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId,
    };
    return this.albumDB.createAlbum(newAlbum);
  }

  getAll(): Promise<Album[]> {
    return this.albumDB.getAlbums();
  }

  private async checkAlbumExists(id: string): Promise<Album> {
    const album = await this.albumDB.getAlbum(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  getAlbum(id: string): Promise<Album> {
    return this.checkAlbumExists(id);
  }

  async updateAlbum(id: string, dto: AlbumInfoDto): Promise<Album> {
    const album = await this.checkAlbumExists(id);

    const updatedAlbum = {
      ...album,
      ...dto,
    };

    return this.albumDB.updateAlbum(updatedAlbum);
  }

  async deleteAlbum(id: string) {
    await this.checkAlbumExists(id);
    await this.albumDB.deleteAlbum(id);
  }
}
