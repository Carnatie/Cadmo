import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './auth.dto';
import { PrismaService } from 'src/providers/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private user: UsersService, private prisma: PrismaService) {}
  async registerUser(data: CreateUserDto) {
    await this.user.getUserByEmail(data.email);
    const createUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: 'USER',
      },
    });
    return createUser;
  }
}
