import { CreateGroupDto, DeleteGroupDto } from '@/dtos/Swagger/group.dto';
import IGroupRepository from '@/interfaces/group/group_repo.interface';
import prisma from '@/utils/db';
import { Group } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class GroupRepository implements IGroupRepository {
  async findAllGroups(): Promise<Group[]> {
    /**
     * Find All Products
     */
    const groups = await prisma.group.findMany({
      // include: {
      //   user: {
      //     select: {
      //       userId: true,
      //     },
      //   },
      // },
    });

    return groups;
  }

  async findGroupById(id: string): Promise<Group> {
    /**
     * Find Group by Id
     */

    const group = await prisma.group.findUnique({
      where: {
        id: id,
      },
    });

    return group;
  }

  async findGroupsByUserId(id: string): Promise<Group[]> {
    const groups = await prisma.group.findMany({
      where: {
        user: {
          some: {
            userId: id,
          },
        },
      },
    });

    return groups;
  }

  async createGroup(group: CreateGroupDto): Promise<Group> {
    /**
     * Create a Group
     */

    const groups = await prisma.group.create({
      data: {
        name: group.name,
        user: {
          create: group.users,
        },
      },
    });

    return groups;
  }

  async updateGroup(id: string, group: CreateGroupDto): Promise<number> {
    /**
     * Update all fields of a Product
     */
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updateGroup = await prisma.group.update({
        where: {
          id: id,
        },
        data: {
          name: group.name,
          user: { create: group.users },
        },
      });
      return this.updateGroup.length;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUsersFromGroup(id: string, userData: DeleteGroupDto): Promise<any> {
    // userData.users.forEach(user => {
    //   console.log(user.userId);
    // });

    const response = await prisma.groupUser.deleteMany({
      where: {
        groupId: id,
        userId: { in: userData.users.map(user => user.userId) },
      },
    });
  }

  async deleteGroup(id: string): Promise<Group> {
    const deleteGroup = await prisma.group.delete({
      where: {
        id: id,
      },
      include: { user: true },
    });

    return deleteGroup;
  }
}
