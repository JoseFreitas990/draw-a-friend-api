import { UserDto } from '@/dtos/Application/user.dto';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';

export default interface IUserService {
  findAllUser(): Promise<UserDto[]>;
  findUserById(id: string): Promise<UserDto>;
  createUser(userData: CreateUserDto): Promise<UserDto>;
  updateUser(userId: string, userData: CreateUserDto): Promise<Number>;
  deleteUser(userId: string): Promise<UserDto>;
}
