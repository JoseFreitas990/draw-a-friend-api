import { Group } from '@prisma/client';

export class GroupDto {
  id: string;
  name: string;

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
  }
}
