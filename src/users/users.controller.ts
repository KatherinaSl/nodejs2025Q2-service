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
import { CreateUserDto, UpdatePasswordDto, UserDto } from './user.interface';
import { UserService } from './user.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<UserDto[]> {
    return this.userService.getAll();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  getOneUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserDto> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() uptadeUserPasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    return this.userService.updatePassword(id, uptadeUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.userService.deleteUser(id);
  }
}
