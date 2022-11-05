import { Draw } from '@prisma/client';

export class DrawDto {
  id: string;
  name: string;
  date: Date;
  groupId: string;
  userId: string;

  constructor(draw: Draw) {
    this.id = draw.id;
    this.name = draw.name;
    this.date = draw.date;
    this.groupId = draw.groupId;
    this.userId = draw.userId;
  }
}
