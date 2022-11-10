import { GroupDto } from '@/dtos/Application/group.dto';
import { CreateGroupDto, DeleteGroupDto } from '@/dtos/Swagger/group.dto';
import IGroupService from '@/interfaces/group/group_service.interface';
import { injector } from '@/inversify.config';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { TYPES } from '@/types';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class GroupUserController {
  public groupUserService = injector.get<IGroupUserService>(TYPES.IGroupUserService);

  @Get('/groups-users/group/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information of users of a group' })
  async getGroupById(@Param('id') id: string) {
    const findOneUserData: GroupDto = await this.groupUserService.findGroupById(id);
    return { result: findOneUserData, message: 'findOne' };
  }

  @Get('/groups-users/user/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information of groups of a user' })
  async getGroupsByUserId(@Param('id') id: string) {
    const findOneUserData: GroupDto[] = await this.groupUserService.findGroupsByUserId(id);
    return { result: findOneUserData, message: 'findOne' };
  }

  @Post('/group-users')
  //@UseBefore(authMiddleware)
  @HttpCode(201)
  //@UseBefore(validationMiddleware(CreateGroupDto, 'body'))
  @OpenAPI({ summary: 'Add new users to a group' })
  async updateGroupUsers(@Body() groupUsersData: any) {
    const createGroupUser: any = await this.groupUserService.createGroup(groupData);
    return { result: createGroupData, message: 'created' };
  }

  @Put('/groups/:id')
  //@UseBefore(authMiddleware)
  @UseBefore(validationMiddleware(CreateGroupDto, 'body', true))
  @OpenAPI({ summary: 'Update a group' })
  async updateGroup(@Param('id') id: string, @Body() groupData: CreateGroupDto) {
    const updateGroup: Number = await this.groupUserService.updateGroup(id, groupData);
    return { result: updateGroup, message: 'Group Updated' };
  }

  @Delete('/group/users/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete users from a group' })
  async deleteUsersFromGroup(@Param('id') id: string, @Body() groupData: DeleteGroupDto) {
    const deleteGroup = await this.groupUserService.deleteUsersFromGroup(id, groupData);
    return { result: deleteGroup, message: 'deleted' };
  }

  @Delete('/group/:id')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Return information about a group' })
  async deleteGroup(@Param('id') id: string) {
    const deleteGroup: GroupDto = await this.groupUserService.deleteGroup(id);
    return { result: deleteGroup, message: 'deleted' };
  }
}
