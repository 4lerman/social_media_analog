import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService],
  controllers: [CommentService],
})
export class CommentModule {}
