import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { updateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: number) {
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
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
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

  async getUsers() {
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
}
