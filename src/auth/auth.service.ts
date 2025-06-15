import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import 'dotenv/config';
import { CreateUserDto } from 'src/users/user.interface';
import { UserDB } from 'src/users/userDB';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDB: UserDB,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.userDB.getUserWithPassByLogin(userDto.login);

    if (user && bcrypt.compareSync(userDto.password, user.password)) {
      return this.createTokens(user.id, user.login);
    } else {
      throw new ForbiddenException(
        "No user with such login, password doesn't match actual one",
      );
    }
  }

  private createTokens(userId: string, login: string) {
    const accessToken = this.jwtService.sign(
      { userId, login },
      { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    );

    const refreshToken = this.jwtService.sign(
      { userId, login },
      {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      },
    );

    return { accessToken, refreshToken };
  }

  refreshToken(refreshDto: RefreshTokenDto) {
    if (!refreshDto.refreshToken) {
      throw new UnauthorizedException('Old refresh token should be provided');
    }

    try {
      const { userId, login } = this.jwtService.verify(
        refreshDto.refreshToken,
        { secret: process.env.JWT_SECRET_REFRESH_KEY },
      );
      return this.createTokens(userId, login);
    } catch (err) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
