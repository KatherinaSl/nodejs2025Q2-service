import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album, AlbumInfoDto } from './album.interface';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Post()
  create(@Body() createAlbumDto: AlbumInfoDto): Promise<Album> {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':id')
  getOneAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Album> {
    return this.albumService.getAlbum(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeAlbumDto: AlbumInfoDto,
  ): Promise<Album> {
    return this.albumService.updateAlbum(id, uptadeAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.albumService.deleteAlbum(id);
  }
}
