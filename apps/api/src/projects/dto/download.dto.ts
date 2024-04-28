import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DownloadDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsString()
  @IsNotEmpty()
  path: string;
}
