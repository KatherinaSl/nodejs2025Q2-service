import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistDB } from './artistDB';
import { Artist, ArtistInfoDto } from './artist.interface';
import { v4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private artistDB: ArtistDB) {}

  getAll(): Promise<Artist[]> {
    return this.artistDB.getArtists();
  }

  create(dto: ArtistInfoDto): Promise<Artist> {
    const newArtist = {
      id: v4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    return this.artistDB.createArtist(newArtist);
  }

  private async checkArtistExists(id: string): Promise<Artist> {
    const artist = await this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  getArtist(id: string): Promise<Artist> {
    return this.checkArtistExists(id);
  }

  async updateArtist(id: string, dto: ArtistInfoDto): Promise<Artist> {
    const artist = await this.checkArtistExists(id);

    const updatedArtist = {
      ...artist,
      ...dto,
    };

    return this.artistDB.updateArtist(updatedArtist);
  }

  async deleteArtist(id: string) {
    const artist = await this.checkArtistExists(id);
    await this.artistDB.deleteArtist(artist);
  }
}
