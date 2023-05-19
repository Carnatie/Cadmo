import { Request } from '@nestjs/common';

export interface UsersPayload {
  sub: number;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface UsersToken {
  access_token: string;
}

export interface UsersFromJwt {
  id: number;
  email: string;
  name: string;
}

export interface AuthRequest extends Request {
  user: UsersPayload;
}
