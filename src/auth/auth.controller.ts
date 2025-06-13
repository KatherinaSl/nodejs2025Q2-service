import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto, UserDto } from 'src/users/user.interface';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }
}
