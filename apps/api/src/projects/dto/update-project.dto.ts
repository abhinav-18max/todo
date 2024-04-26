import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
