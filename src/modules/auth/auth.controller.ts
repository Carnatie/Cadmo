import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './auth.dto';
import { Public } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signupUser')
  @Public()
  async registerUser(@Body() data: CreateUserDto) {
    return await this.authService.registerUser(data);
  }

  @Post('signInUser')
  @Public()
  async singInUser(@Request() req) {
    return this.authService.signInUser(req.body.email);
  }
}
