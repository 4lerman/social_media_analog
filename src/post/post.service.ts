import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditPostDto } from './dto/edit-post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  getPosts() {
    return this.prisma.post.findMany();
  }

  getPostById(userId: number, postId: number) {
    return this.prisma.post.findFirst({
      where: {
        id: postId,
        userId,
      },
    });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        userId,
        ...dto,
      },
    });
    return post;
  }

  async editPost(userId: number, postId: number, dto: EditPostDto) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to source denied!');

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to source denied!');

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }

  async giveLike(postId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new ForbiddenException('Source cannot be found!');

    return this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }
}
