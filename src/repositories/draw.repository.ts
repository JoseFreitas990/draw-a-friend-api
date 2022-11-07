import { CreateDrawDto } from '@/dtos/Swagger/draw.dto';
import { CreateGroupDto } from '@/dtos/Swagger/group.dto';
import IDrawRepository from '@/interfaces/draw/draw_repo.interface';
import IGroupRepository from '@/interfaces/group/group_repo.interface';
import prisma from '@/utils/db';
import { Draw, Group } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class DrawRepository implements IDrawRepository {
  async findAllDraws(): Promise<Draw[]> {
    /**
     * Find All Products
     */

    const draws = await prisma.draw.findMany({});

    return draws;
  }

  async findDrawById(id: string): Promise<Draw> {
    /**
     * Find Product by Id
     */

    const draw = await prisma.draw.findUnique({
      where: {
        id: id,
      },
    });

    return draw;
  }

  async createDraw(draw: CreateDrawDto): Promise<Draw> {
    /**
     * Create a Product
     */

    const draws = await prisma.draw.create({
      data: {
        name: draw.name,
        groupDraw: { connect: { id: draw.groupId } },
        result: { connect: { id: draw.resultId } },
      },
    });

    return draws;
  }

  async updateDraw(id: string, draw: CreateDrawDto): Promise<any> {
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

  async deleteDraw(id: string): Promise<Draw> {
    /**
     * Delete a Product
     */

    const deleteDraw = await prisma.draw.delete({
      where: {
        id: id,
      },
    });

    return deleteDraw;
  }
}
