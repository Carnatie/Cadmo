import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/providers/prisma/prisma.service';
import { comparePassword, cryptPassword } from 'src/utils/bcript';
import { UsersPayload, UsersToken } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private jwtService: JwtService,
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

  async signInUser(email: string): Promise<UsersToken> {
    const user = await this.usersService.getUserByEmail(email);
    const payload: UsersPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email or password is incorrect!',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
