import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  getCommentsOnPost(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }

  async createComment(userId: number, postId: number, dto: CreateCommentDto) {
    const comment = this.prisma.comment.create({
      data: {
        userId,
        postId,
        ...dto,
      },
    });

    return comment;
  }

  async editComment(userId: number, postId: number, dto: EditCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!comment || comment.userId !== userId)
      throw new ForbiddenException('Access to source denied!');

    return this.prisma.comment.update({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteComment(userId: number, postId: number) {
    const post = await this.prisma.comment.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!post || post.userId !== userId)
      throw new ForbiddenException('Access to source denied!');

    await this.prisma.comment.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  }
}
