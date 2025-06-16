import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDB } from './userDB';

@Module({
  providers: [UserDB, UserService, PrismaService],
  controllers: [UsersController],
})
export class UserModule {}
