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
import { Artist, ArtistInfoDto } from './artist.interface';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Post()
  create(@Body() createArtistDto: ArtistInfoDto): Promise<Artist> {
    return this.artistService.create(createArtistDto);
  }

  @Get(':id')
  getOneArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Artist> {
    return this.artistService.getArtist(id);
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeArtistInfoDto: ArtistInfoDto,
  ): Promise<Artist> {
    return this.artistService.updateArtist(id, uptadeArtistInfoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.artistService.deleteArtist(id);
  }
}
