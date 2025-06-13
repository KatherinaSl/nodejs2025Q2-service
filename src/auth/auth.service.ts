import { ForbiddenException, Injectable } from '@nestjs/common';
import 'dotenv/config';
import { CreateUserDto } from 'src/users/user.interface';
import { UserDB } from 'src/users/userDB';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDB: UserDB,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.userDB.getUserWithPassByLogin(userDto.login);

    if (user && bcrypt.compareSync(userDto.password, user.password)) {
      const accessToken = this.jwtService.sign(
        { userId: user.id, login: user.login },
        { expiresIn: process.env.TOKEN_EXPIRE_TIME },
      );

      return { accessToken };
    } else {
      throw new ForbiddenException(
        "No user with such login, password doesn't match actual one",
      );
    }
  }
}
