import { Request } from 'express';
import { UserDto } from '@/dtos/Application/user.dto';
import { User } from '@prisma/client';
import { LoginUserDto } from '@/dtos/Swagger/user_login.dto';

export interface DataStoredInToken {
  id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export default interface IAuthService {
  login(userData: LoginUserDto): Promise<{ cookie: string; findUser: UserDto }>;
  logout(userData: UserDto): Promise<UserDto>;
  createToken(user: UserDto): TokenData;
  createCookie(tokenData: TokenData): string;
}
