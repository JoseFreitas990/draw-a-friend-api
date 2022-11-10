import { DrawDto } from '@/dtos/Application/draw.dto';
import { CreateDrawDto } from '@/dtos/Swagger/draw.dto';

export default interface IDrawService {
  findAllDraws(): Promise<DrawDto[]>;
  findDrawById(id: string): Promise<DrawDto>;
  findDrawsByUser(userId: string): Promise<DrawDto[]>;
  findDrawsByGroup(groupId: string): Promise<DrawDto[]>;
  createDraw(draw: CreateDrawDto): Promise<DrawDto>;
  updateDraw(id: string, userData: CreateDrawDto): Promise<Number>;
  deleteDraw(id: string): Promise<DrawDto>;
}
