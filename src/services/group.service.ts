import { HttpException } from '@exceptions/HttpException';
import { injectable } from 'inversify';
import { injector } from '@/inversify.config';
import { Group } from '@prisma/client';
import { TYPES } from '@/types';
import IGroupService from '@/interfaces/group/group_service.interface';
import { GroupDto } from '@/dtos/Application/group.dto';
import IGroupRepository from '@/interfaces/group/group_repo.interface';
import { CreateGroupDto } from '@/dtos/Swagger/group.dto';

@injectable()
export class GroupService implements IGroupService {
  public groupRepository = injector.get<IGroupRepository>(TYPES.IGroupRepository);

  async findAllGroups(): Promise<GroupDto[]> {
    const groups: Group[] = await this.groupRepository.findAllGroups();

    return this.listToDto(groups);
  }

  async findGroupById(id: string): Promise<GroupDto> {
    const group = await this.groupRepository.findGroupById(id);
    if (!group) throw new HttpException(409, 'No Group found with this key');

    const findGroup: GroupDto = new GroupDto(group);

    return findGroup;
  }

  async findGroupsByUserId(id: string): Promise<GroupDto[]> {
    const groups = await this.groupRepository.findGroupsByUserId(id);
    if (!groups) throw new HttpException(409, 'No Groups found with this key');

    return groups;
  }

  async createGroup(groupData: CreateGroupDto): Promise<GroupDto> {
    let newGroup: GroupDto;

    try {
      newGroup = new GroupDto(await this.groupRepository.createGroup(groupData));
    } catch (error) {
      throw new HttpException(409, 'Error creating new group, because of duplicate information');
    }

    return newGroup;
  }

  async updateGroup(id: string, groupData: CreateGroupDto): Promise<Number> {
    const findGroup: GroupDto = await this.groupRepository.findGroupById(id);
    if (!findGroup) throw new HttpException(409, 'No group found with this key');

    const newGroup = await this.groupRepository.updateGroup(id, groupData);
    if (newGroup <= 0) throw new HttpException(409, 'Error updating group');

    return newGroup;
  }

  async deleteGroup(id: string): Promise<GroupDto> {
    const findGroup: GroupDto = await this.groupRepository.findGroupById(id);
    if (!findGroup) throw new HttpException(409, 'No group found with this key');

    const deleteGroup = await this.groupRepository.deleteGroup(id);
    return deleteGroup;
  }

  private listToDto(list: Group[]): GroupDto[] {
    const groupList: GroupDto[] = [];

    list.map(elem => {
      groupList.push(new GroupDto(elem));
    });

    return groupList;
  }
}
