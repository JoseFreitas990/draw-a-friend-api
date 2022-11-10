import bcrypt from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { injectable } from 'inversify';
import IUserRepository from '../interfaces/user/user_repo.interface';
import { injector } from '@/inversify.config';
import { User } from '@prisma/client';
import { TYPES } from '@/types';
import IUserService from '@/interfaces/user/user_service.interface';
import { UserDto } from '@/dtos/Application/user.dto';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';

@injectable()
export class UserService implements IUserService {
  public usersRepository = injector.get<IUserRepository>(TYPES.IUserRepository);

  public async findAllUser(): Promise<UserDto[]> {
    const users: User[] = await this.usersRepository.findAllUser();

    return this.listToDto(users);
  }

  public async findUserById(id: string): Promise<UserDto> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new HttpException(409, 'No User found with this key');

    const findUser: UserDto = new UserDto(user);

    return findUser;
  }

  public async findUsersByGroup(groupId: string): Promise<UserDto[]> {
    const users: User[] = await this.usersRepository.findUsersByGroup(groupId);

    return this.listToDto(users);
  }

  public async createUser(userData: CreateUserDto): Promise<UserDto> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: UserDto = await this.usersRepository.findUserByEmail(userData.email);
    if (findUser) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const user = await this.usersRepository.createUser(userData);
    if (!user) throw new HttpException(409, 'Error creating user');

    const newUser = new UserDto(user);

    return newUser;
  }

  public async updateUser(id: string, userData: CreateUserDto): Promise<Number> {
    if (isEmpty(userData)) throw new HttpException(400, 'No user data given');

    const findUser: UserDto = await this.usersRepository.findUserById(id);
    if (!findUser) throw new HttpException(409, 'No user found with this key');

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    const updateUser: Number = await this.usersRepository.updateUser(id, userData);
    if (updateUser <= 0) throw new HttpException(409, 'Error updating user');

    return updateUser;
  }

  public async deleteUser(id: string): Promise<UserDto> {
    const findUser: UserDto = await this.usersRepository.findUserById(id);
    if (!findUser) throw new HttpException(409, 'No user found with this key');

    const user = await this.usersRepository.deleteUser(id);
    if (!user) throw new HttpException(409, 'Error deleting user');

    const deleteUserData: UserDto = new UserDto(user);
    return deleteUserData;
  }

  private listToDto(list: User[]): UserDto[] {
    const userList: UserDto[] = [];

    list.map(elem => {
      userList.push(new UserDto(elem));
    });

    return userList;
  }
}
