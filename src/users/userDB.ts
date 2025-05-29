import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserDB {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  getUsers(): User[] {
    return [...this.users.values()];
  }

  createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  getUser(id: string): User {
    return this.users.get(id);
  }

  updatePassword(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  deleteUser(user: User) {
    this.users.delete(user.id);
  }
}
