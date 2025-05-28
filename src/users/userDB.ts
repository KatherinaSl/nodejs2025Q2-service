import { Injectable } from '@nestjs/common';
import { CreateUserDto, UptadeUserPasswordDto, User } from './user.interface';
import { v4 } from 'uuid';

@Injectable()
export class UserDB {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  getUsers(): User[] {
    return [...this.users.values()];
  }

  createUser(creds: CreateUserDto): User {
    const newUser = new User({
      id: v4(),
      login: creds.login,
      password: creds.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    });

    this.users.set(newUser.id, newUser);
    return newUser;
  }

  getUser(id: string): User {
    return this.users.get(id);
  }

  updatePassword(user: User, newPass: UptadeUserPasswordDto): User {
    user.password = newPass.newPassword;
    user.version++;
    user.updatedAt = new Date().getTime();

    this.users.set(user.id, user);
    return user;
  }

  deleteUser(user: User) {
    this.users.delete(user.id);
  }
}
