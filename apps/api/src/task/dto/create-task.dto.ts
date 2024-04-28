import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNumber()
  @IsNotEmpty()
  project_id: number;
}
