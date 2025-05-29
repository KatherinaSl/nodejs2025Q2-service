import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  artistId: string | null;
}
