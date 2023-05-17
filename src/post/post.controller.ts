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

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

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

  @Post()
  createPost(@GetUser('id') userId: number, @Body() dto: CreatePostDto) {
    return this.postService.createPost(userId, dto);
  }

  @Post(':id')
  giveLike(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.giveLike(postId);
  }

  @Patch(':id')
  editPost(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
    @Body() dto: EditPostDto,
  ) {
    return this.postService.editPost(userId, postId, dto);
  }

  @Delete(':id')
  deletePost(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) postId: number,
  ) {
    return this.postService.deletePost(userId, postId);
  }
}
