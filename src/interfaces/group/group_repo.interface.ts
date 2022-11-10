import { CreateGroupDto, DeleteGroupDto } from '@/dtos/Swagger/group.dto';
import { Group } from '@prisma/client';

export default interface IGroupRepository {
  findAllGroups(): Promise<Group[]>;
  findGroupById(id: string): Promise<Group>;
  findGroupsByUserId(id: string): Promise<Group[]>;
  createGroup(group: CreateGroupDto): Promise<Group>;
  updateGroup(id: string, userData: CreateGroupDto): Promise<Group>;
  deleteUsersFromGroup(id: string, userData: DeleteGroupDto): Promise<Number>;
  deleteGroup(groupId: string): Promise<Group>;
}
