import { DrawDto } from '@/dtos/Application/draw.dto';
import { CreateDrawDto } from '@/dtos/Swagger/draw.dto';
import IDrawService from '@/interfaces/draw/draw_service.interface';
import { injector } from '@/inversify.config';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { TYPES } from '@/types';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class DrawController {
  public drawService = injector.get<IDrawService>(TYPES.IDrawService);

  @Get('/draws')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return a list of draws' })
  async getDraws() {
    const findAllDraws: DrawDto[] = await this.drawService.findAllDraws();
    return { result: findAllDraws, message: 'findAll' };
  }

  @Get('/draws/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a draw' })
  async getDrawById(@Param('id') id: string) {
    const findOneUserData: DrawDto = await this.drawService.findDrawById(id);
    return { result: findOneUserData, message: 'findOne' };
  }

  @Post('/draws')
  //@UseBefore(authMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateDrawDto, 'body'))
  @OpenAPI({ summary: 'Create a new draw' })
  async createDraw(@Body() drawData: CreateDrawDto) {
    const createDrawData: DrawDto = await this.drawService.createDraw(drawData);
    return { result: createDrawData, message: 'created' };
  }

  @Put('/draws/:id')
  //@UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateDrawDto, 'body', true))
  @OpenAPI({ summary: 'Update a draw' })
  async updateDraw(@Param('id') id: string, @Body() drawData: CreateDrawDto) {
    const updateDraw: Number = await this.drawService.updateDraw(id, drawData);
    return { result: updateDraw, message: 'Draw Updated' };
  }

  @Delete('/draws/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a draw' })
  async deleteDraw(@Param('id') id: string) {
    const deleteDraw: DrawDto = await this.drawService.deleteDraw(id);
    return { result: deleteDraw, message: 'deleted' };
  }
}
