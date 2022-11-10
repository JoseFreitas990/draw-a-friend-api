import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import { HttpException } from '@exceptions/HttpException';
import IAuthService, { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { injectable } from 'inversify';
import { injector } from '@/inversify.config';
import IUserRepository from '@/interfaces/user/user_repo.interface';
import { TYPES } from '@/types';
import { UserDto } from '@/dtos/Application/user.dto';
import bcrypt from 'bcrypt';
import { LoginUserDto } from '@/dtos/Swagger/user-login.dto';
import { User } from '@prisma/client';
import config from 'config';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/configs-values';

@injectable()
class AuthService implements IAuthService {
  public usersRepository = injector.get<IUserRepository>(TYPES.IUserRepository);

  public async signup(userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const createUser: UserDto = await this.usersRepository.createUser(userData);

    return createUser;
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; findUser: UserDto }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.usersRepository.findUserByEmail(userData.email);
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: UserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserByEmail(userData.email);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    /**
     * One hour Token
     */

    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
