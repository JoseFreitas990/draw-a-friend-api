import { DrawDto } from '@/dtos/Application/draw.dto';
import { CreateDrawDto } from '@/dtos/Swagger/draw.dto';
import { HttpException } from '@/exceptions/HttpException';
import IDrawRepository from '@/interfaces/draw/draw_repo.interface';
import IDrawService from '@/interfaces/draw/draw_service.interface';
import { injector } from '@/inversify.config';
import { TYPES } from '@/types';
import { Draw } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class DrawService implements IDrawService {
  public drawRepository = injector.get<IDrawRepository>(TYPES.IDrawRepository);

  async findAllDraws(): Promise<DrawDto[]> {
    const draws: Draw[] = await this.drawRepository.findAllDraws();

    return this.listToDto(draws);
  }

  async findDrawById(id: string): Promise<DrawDto> {
    const draw = await this.drawRepository.findDrawById(id);
    if (!draw) throw new HttpException(409, 'No Draw found with this key');

    const findDraw: DrawDto = new DrawDto(draw);

    return findDraw;
  }

  async createDraw(drawData: CreateDrawDto): Promise<DrawDto> {
    let newDraw: DrawDto;

    try {
      newDraw = new DrawDto(await this.drawRepository.createDraw(drawData));
    } catch (error) {
      throw new HttpException(409, 'Error creating new draw, because of duplicate information');
    }

    return newDraw;
  }

  async updateDraw(id: string, drawData: CreateDrawDto): Promise<Number> {
    const findDraw: DrawDto = await this.drawRepository.findDrawById(id);
    if (!findDraw) throw new HttpException(409, 'No draw found with this key');

    const newDraw = await this.drawRepository.updateDraw(id, drawData);
    if (newDraw <= 0) throw new HttpException(409, 'Error updating groudrawp');

    return newDraw;
  }

  async deleteDraw(id: string): Promise<DrawDto> {
    const findDraw: DrawDto = await this.drawRepository.findDrawById(id);
    if (!findDraw) throw new HttpException(409, 'No draw found with this key');

    const deleteDraw = await this.drawRepository.deleteDraw(id);
    return deleteDraw;
  }

  private listToDto(list: Draw[]): DrawDto[] {
    const drawList: DrawDto[] = [];

    list.map(elem => {
      drawList.push(new DrawDto(elem));
    });

    return drawList;
  }
}
