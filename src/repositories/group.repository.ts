import { CreateGroupDto } from '@/dtos/Swagger/group.dto';
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

    const groups = await prisma.group.findMany({});

    return groups;
  }

  async findGroupById(id: string): Promise<Group> {
    /**
     * Find Product by Id
     */

    const group = await prisma.group.findUnique({
      where: {
        id: id,
      },
    });

    return group;
  }

  async createGroup(group: CreateGroupDto): Promise<Group> {
    /**
     * Create a Product
     */

    const groups = await prisma.group.create({
      data: {
        name: group.name,
      },
    });

    return groups;
  }

  async updateGroup(id: string, group: CreateGroupDto): Promise<any> {
    /**
     * Update all fields of a Product
     */
    // try {
    //   const updateProduct = await prisma.product_Wharehouse.updateMany({
    //     where: {
    //       id: id,
    //       version: group.version,
    //     },
    //     data: {
    //       name: group.name,
    //       grossweight: group.grossweight,
    //       netWeight: group.netWeight,
    //       width: group.width,
    //       lenght: group.lenght,
    //       hscode: group.hscode,
    //       price_acq: group.price_acq,
    //       price_aux: group.price_aux,
    //       ean: group.ean,
    //       version: {
    //         increment: 1,
    //       },
    //     },
    //   });
    //   return updateProduct.count;
    // } catch (error) {
    //   return null;
    // }
  }

  async deleteGroup(id: string): Promise<Group> {
    /**
     * Delete a Product
     */

    const deleteGroup = await prisma.group.delete({
      where: {
        id: id,
      },
    });

    return deleteGroup;
  }
}
