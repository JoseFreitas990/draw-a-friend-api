import { GroupDto } from '@/dtos/Application/group.dto';
import { CreateGroupDto, DeleteGroupDto } from '@/dtos/Swagger/group.dto';

export default interface IGroupService {
  findAllGroups(): Promise<GroupDto[]>;
  findGroupById(id: string): Promise<GroupDto>;
  findGroupsByUserId(id: string): Promise<GroupDto[]>;

  createGroup(group: CreateGroupDto): Promise<GroupDto>;
  updateGroup(id: string, userData: CreateGroupDto): Promise<Number>;
  deleteUsersFromGroup(id: string, userData: DeleteGroupDto): Promise<Number>;

  deleteGroup(id: string): Promise<GroupDto>;
}
