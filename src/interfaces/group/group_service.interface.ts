import { GroupDto } from '@/dtos/Application/group.dto';
import { CreateGroupDto } from '@/dtos/Swagger/group.dto';

export default interface IGroupService {
  findAllGroups(): Promise<GroupDto[]>;
  findGroupById(id: string): Promise<GroupDto>;
  createGroup(group: CreateGroupDto): Promise<GroupDto>;
  updateGroup(id: string, userData: CreateGroupDto): Promise<Number>;
  deleteGroup(id: string): Promise<GroupDto>;
}
