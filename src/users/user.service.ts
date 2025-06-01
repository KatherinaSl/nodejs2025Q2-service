import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDB } from './userDB';
import { CreateUserDto, UpdatePasswordDto, User } from './user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private userDB: UserDB) {}

  getAll(): User[] {
    return this.userDB.getUsers();
  }

  create(creds: CreateUserDto): User {
    const newUser = new User({
      id: v4(),
      login: creds.login,
      password: creds.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    return this.userDB.createUser(newUser);
  }

  private checkUserExists(id: string): User {
    const user = this.userDB.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getUser(id: string): User {
    return this.checkUserExists(id);
  }

  updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = this.checkUserExists(id);

    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = dto.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();

    return this.userDB.updatePassword(user);
  }

  deleteUser(id: string) {
    this.checkUserExists(id);
    this.userDB.deleteUser(id);
  }
}
