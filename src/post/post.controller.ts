import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { EditPostDto } from './dto/edit-post.dto';
import { CommentService } from 'src/comment/comment.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { EditCommentDto } from 'src/comment/dto/edit-comment.dto';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  getPostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.getPostById(userId, postId);
  }

  @Get(':id/comments')
  getCommentsOnPost(@Param('id', ParseIntPipe) postId: number) {
    return this.commentService.getCommentsOnPost(postId);
  }

  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Post(':id')
  giveLike(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.giveLike(userId, postId);
  }

  @Post(':id/comments')
  createComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.createComment(userId, postId, dto);
  }

  @Patch(':id')
  editPost(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: EditPostDto,
  ) {
    return this.postService.editPost(userId, postId, dto);
  }

  @Patch(':id/comments')
  editComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: EditCommentDto,
  ) {
    return this.commentService.editComment(userId, postId, dto);
  }

  @Delete(':id')
  deletePost(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePost(userId, postId);
  }

  @Delete(':id/comments')
  deleteComment(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.commentService.deleteComment(userId, postId);
  }
}
