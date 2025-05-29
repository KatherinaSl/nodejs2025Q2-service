import {
  Body,
  Controller,
  Get,
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
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Post()
  create(@Body() createTrackDto: TrackInfoDto): Track {
    return this.trackService.create(createTrackDto);
  }

  @Get(':id')
  getOneTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Track {
    return this.trackService.getTrack(id);
  }

  @Put(':id')
  updateTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeTrackDto: TrackInfoDto,
  ): Track {
    return this.trackService.updateTrack(id, uptadeTrackDto);
  }

  //todo delete method
  //   @Delete(':id')
  //   @HttpCode(204)
  //   deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {}
}
