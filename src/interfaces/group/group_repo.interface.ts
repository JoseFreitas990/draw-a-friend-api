import { CreateGroupDto } from '@/dtos/Swagger/group.dto';
import { Group } from '@prisma/client';

export default interface IGroupRepository {
  findAllGroups(): Promise<Group[]>;
  findGroupById(id: string): Promise<Group>;
  createGroup(group: CreateGroupDto): Promise<Group>;
  updateGroup(groupId: string, userData: CreateGroupDto): Promise<Number>;
  deleteGroup(groupId: string): Promise<Group>;
}
