import { GroupDto } from '@/dtos/Application/group.dto';
import { CreateGroupDto } from '@/dtos/Swagger/group.dto';
import IGroupService from '@/interfaces/group/group_service.interface';
import { injector } from '@/inversify.config';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { TYPES } from '@/types';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class GroupController {
  public groupService = injector.get<IGroupService>(TYPES.IGroupService);

  @Get('/groups')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return a list of groups' })
  async getGroups() {
    const findAllGroups: GroupDto[] = await this.groupService.findAllGroups();
    return { result: findAllGroups, message: 'findAll' };
  }

  @Get('/groups/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a group' })
  async getGroupById(@Param('id') id: string) {
    const findOneUserData: GroupDto = await this.groupService.findGroupById(id);
    return { result: findOneUserData, message: 'findOne' };
  }

  @Get('/groups/user/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about groups of a user' })
  async getGroupsByUserId(@Param('id') id: string) {
    const findOneUserData: GroupDto[] = await this.groupService.findGroupsByUserId(id);
    return { result: findOneUserData, message: 'findOne' };
  }

  @Post('/groups')
  //@UseBefore(authMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateGroupDto, 'body'))
  @OpenAPI({ summary: 'Create a new group' })
  async creategroup(@Body() groupData: CreateGroupDto) {
    const createGroupData: GroupDto = await this.groupService.createGroup(groupData);
    return { result: createGroupData, message: 'created' };
  }

  @Put('/groups/:id')
  //@UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateGroupDto, 'body', true))
  @OpenAPI({ summary: 'Update a group' })
  async updateGroup(@Param('id') id: string, @Body() groupData: CreateGroupDto) {
    const updateGroup: Number = await this.groupService.updateGroup(id, groupData);
    return { result: updateGroup, message: 'Group Updated' };
  }

  @Delete('/group/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a group' })
  async deleteGroup(@Param('id') id: string) {
    const deleteGroup: GroupDto = await this.groupService.deleteGroup(id);
    return { result: deleteGroup, message: 'deleted' };
  }
}
