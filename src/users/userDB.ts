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

@Injectable()
export class UserDB {
  async getUsers(): Promise<UserDto[]> {
    return await prisma.user.findMany();
  }

  async createUser(user: User): Promise<UserDto> {
    return await prisma.user.create({
      data: user,
    });
  }

  async getUser(id: string): Promise<UserDto> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserWithPass(id: string): Promise<User> {
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

  async getUserWithPassByLogin(login: string): Promise<User> {
    return await prisma.user.findUnique({
      select: {
        id: true,
        login: true,
        password: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { login },
    });
  }

  async updateUser(user: User): Promise<UserDto> {
    return await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
