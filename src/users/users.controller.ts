import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, User } from './user.interface';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  getOneUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): User {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeUserPasswordDto: UpdatePasswordDto,
  ): User {
    return this.userService.updatePassword(id, uptadeUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    this.userService.deleteUser(id);
  }
}
