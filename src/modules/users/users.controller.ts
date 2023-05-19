import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }

  @Put(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() data: updateUserDto,
  ) {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':userId')
  deleteUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
