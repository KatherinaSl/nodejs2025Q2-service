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
  getAll(): FavoritesResponse {
    return this.favService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.deleteTrack(id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.deleteAlbum(id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.favService.deleteArtist(id);
  }
}
