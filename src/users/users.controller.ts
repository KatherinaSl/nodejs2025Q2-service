import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from './user.interface';
import { UserDB } from './userDB';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private userDB: UserDB) {}

  @Get()
  getAll(): User[] {
    return this.userDB.getUsers();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userDB.createUser(createUserDto);
  }

  @Get(':id')
  getOneUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): User {
    const user = this.userDB.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeUserPasswordDto: UpdatePasswordDto,
  ): User {
    const user = this.userDB.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== uptadeUserPasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    return this.userDB.updatePassword(user, uptadeUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = this.userDB.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userDB.deleteUser(user);
  }
}
