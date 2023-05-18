import { Global, Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Global()
@Module({
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
