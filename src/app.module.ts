import { Module } from '@nestjs/common';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    PrismaModule,
    PostModule,
  ],
})
export class AppModule {}
