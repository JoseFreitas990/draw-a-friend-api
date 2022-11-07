import { CreateDrawDto } from '@/dtos/Swagger/draw.dto';
import { Draw } from '@prisma/client';

export default interface IDrawRepository {
  findAllDraws(): Promise<Draw[]>;
  findDrawById(id: string): Promise<Draw>;
  createDraw(draw: CreateDrawDto): Promise<Draw>;
  updateDraw(drawId: string, userData: CreateDrawDto): Promise<Number>;
  deleteDraw(drawId: string): Promise<Draw>;
}
