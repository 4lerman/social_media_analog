import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  secondName: string;
}
