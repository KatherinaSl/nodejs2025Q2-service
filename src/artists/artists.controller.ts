import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistDB } from './artistDB';
import { Artist, ArtistInfoDto } from './artist.interface';

@Controller('artist')
export class ArtistsController {
  constructor(private artistDB: ArtistDB) {}

  @Get()
  getAll(): Artist[] {
    return this.artistDB.getArtists();
  }

  @Post()
  create(@Body() createArtistDto: ArtistInfoDto): Artist {
    return this.artistDB.createArtist(createArtistDto);
  }

  @Get(':id')
  getOneArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artist {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  @Put(':id')
  updateArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeArtistInfoDto: ArtistInfoDto,
  ): Artist {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.artistDB.updateArtistInfo(artist, uptadeArtistInfoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const artist = this.artistDB.getArtist(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.artistDB.deleteArtist(artist);
  }
}
