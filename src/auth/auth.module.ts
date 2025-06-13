import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDB } from 'src/users/userDB';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET_KEY })],
  controllers: [AuthController],
  providers: [UserService, AuthService, PrismaService, UserDB],
})
export class AuthModule {}
