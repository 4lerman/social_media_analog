import { IsOptional, IsString } from 'class-validator';

export class EditCommentDto {
  @IsOptional()
  @IsString()
  comment: string;
}
