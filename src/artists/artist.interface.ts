import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
