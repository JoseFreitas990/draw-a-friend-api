import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import IUserRepository from '@/interfaces/user/user_repo.interface';
import prisma from '@/utils/db';
import { User } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class UserRepository implements IUserRepository {
  public async findAllUser(): Promise<User[]> {
    /**
     * Find All Users
     */

    const users = await prisma.user.findMany({});

    return users;
  }

  public async findUserById(id: string): Promise<User | null> {
    /**
     * Find User by Id
     */

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    /**
     * Find User by Id
     */

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async findUsersByGroup(groupId: string): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      where: {
        group: { every: { groupId: groupId } },
      },
    });
    return users;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    /**
     * Create a User and Img, only admins can do this
     */
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });

    return user;
  }

  public async updateUser(id: string, userData: CreateUserDto): Promise<Number> {
    /**
     * Update all Fields of a User
     */

    try {
      const updateUser = await prisma.user.updateMany({
        where: {
          id: id,
        },
        data: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
      });

      return updateUser.count;
    } catch (error) {
      return null;
    }
  }

  public async deleteUser(id: string): Promise<User> {
    /**
     * Delete a User
     */

    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return deleteUser;
  }
}
