import { Injectable } from '@nestjs/common';
import { User, UserDto } from './user.interface';
import { PrismaClient } from 'generated/prisma/client';

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

// const prisma = new PrismaClient();

@Injectable()
export class UserDB {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUsers(): Promise<UserDto[]> {
    return await prisma.user.findMany();
    // return [...this.users.values()];
  }

  async createUser(user: User): Promise<UserDto> {
    // this.users.set(user.id, user);
    // return user;
    return await prisma.user.create({
      data: user,
    });
  }

  async getUser(id: string): Promise<UserDto> {
    // return this.users.get(id);
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserWithPass(id: string): Promise<User> {
    // return this.users.get(id);
    return await prisma.user.findUnique({
      select: {
        id: true,
        login: true,
        password: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });
  }

  async updateUser(user: User): Promise<UserDto> {
    // this.users.set(user.id, user);
    return await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUser(id: string) {
    // this.users.delete(id);
    return prisma.user.delete({
      where: { id },
    });
  }
}
