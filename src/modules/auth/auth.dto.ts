import { UserRole } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  name: string;
  password: string;
  role: UserRole;
}
