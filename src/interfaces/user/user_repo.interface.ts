import { User } from '@prisma/client';
import { CreateUserDto } from '../../dtos/Swagger/users.dto';

export default interface IUserRepository {
  findAllUser(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUsersByGroup(groupId: string): Promise<User[] | null>;

  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(id: string, userData: CreateUserDto): Promise<Number>;
  deleteUser(id: string): Promise<User>;
}
