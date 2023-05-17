import { IsOptional, IsString } from 'class-validator';

export class EditPostDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
