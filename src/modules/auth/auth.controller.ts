import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signupUser')
  async registerUser(@Body() data: CreateUserDto) {
    return await this.authService.registerUser(data);
  }
}
