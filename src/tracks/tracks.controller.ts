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
import { TrackInfoDto, Track } from './track.interface';
import { TrackService } from './track.service';

@Controller('track')
export class TracksController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Post()
  create(@Body() createTrackDto: TrackInfoDto): Promise<Track> {
    return this.trackService.create(createTrackDto);
  }

  @Get(':id')
  getOneTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Track> {
    return this.trackService.getTrack(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeTrackDto: TrackInfoDto,
  ): Promise<Track> {
    return this.trackService.updateTrack(id, uptadeTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.trackService.deleteTrack(id);
  }
}
