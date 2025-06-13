import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDB } from './userDB';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserDto,
} from './user.interface';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(private userDB: UserDB) {}

  getAll(): Promise<UserDto[]> {
    return this.userDB.getUsers();
  }

  create(creds: CreateUserDto): Promise<UserDto> {
    const now = Date.now();
    const currentTime = Math.floor(now / 1000);
    const hashPass = bcrypt.hashSync(
      creds.password,
      Number(process.env.CRYPT_SALT),
    );

    const newUser = new User({
      id: v4(),
      login: creds.login,
      password: hashPass,
      version: 1,
      createdAt: currentTime,
      updatedAt: currentTime,
    });

    return this.userDB.createUser(newUser);
  }

  private async checkUserExists(id: string): Promise<UserDto> {
    const user = await this.userDB.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getUser(id: string): Promise<UserDto> {
    return this.checkUserExists(id);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.userDB.getUserWithPass(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const now = Date.now();
    const currentTime = Math.floor(now / 1000);

    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = currentTime + 1;

    return this.userDB.updateUser(user);
  }

  async deleteUser(id: string) {
    await this.checkUserExists(id);
    await this.userDB.deleteUser(id);
  }
}
