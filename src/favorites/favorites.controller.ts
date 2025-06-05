import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesResponse } from './favorites.interface';
import { FavService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favService: FavService) {}

  @Get()
  async getAll(): Promise<FavoritesResponse> {
    return await this.favService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favService.deleteTrack(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favService.deleteAlbum(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.favService.deleteArtist(id);
  }
}
