import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { updateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    return users;
  }

  async updateUser(id: number, data: updateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return updatedUser;
  }

  async deleteUser(id) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.user.deleteMany({ where: { id } });
    return HttpStatus.ACCEPTED;
  }

  async ifEmailAlreadyRegistered(email: string) {
    const userEmail = await this.prisma.user.findFirst({
      where: { email },
    });
    if (userEmail) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Email already registered',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
