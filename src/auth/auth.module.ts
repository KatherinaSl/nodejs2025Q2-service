import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/users/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDB } from 'src/users/userDB';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET_KEY }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    PrismaService,
    UserDB,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
