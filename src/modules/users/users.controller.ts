import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUserDto } from './users.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() data: updateUserDto,
  ) {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
