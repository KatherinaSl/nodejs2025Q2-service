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
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Post()
  create(@Body() createAlbumDto: AlbumInfoDto): Album {
    return this.albumService.create(createAlbumDto);
  }

  @Get(':id')
  getOneAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Album {
    return this.albumService.getAlbum(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeAlbumDto: AlbumInfoDto,
  ): Album {
    return this.albumService.updateAlbum(id, uptadeAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
