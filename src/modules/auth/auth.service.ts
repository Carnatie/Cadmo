import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './auth.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { cryptPassword } from 'src/utils/bcript';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  async registerUser(data: CreateUserDto) {
    await this.usersService.ifEmailAlreadyRegistered(data.email);
    const createUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: await cryptPassword(data.password),
        role: 'USER',
      },
    });
    return createUser;
  }
}
