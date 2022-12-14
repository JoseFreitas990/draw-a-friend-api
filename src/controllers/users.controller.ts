import { Controller, Param, Body, Get, Post, Put, Delete, HttpCode, UseBefore, CookieParam } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { CreateUserDto } from '@/dtos/Swagger/users.dto';
import { injector } from '@/inversify.config';
import IUserService from '@/interfaces/user/user_service.interface';
import { TYPES } from '@/types';
import { UserDto } from '@/dtos/Application/user.dto';
import { validationMiddleware } from '@/middlewares/validation.middleware';
import { tokenToId } from '@/utils/token';

@Controller()
export class UsersController {
  public userService = injector.get<IUserService>(TYPES.IUserService);

  @Get('/users')
  //@UseBefore(onlyAdminsMiddleware)
  @OpenAPI({ summary: 'Return a list of Users' })
  async getUsers() {
    const findAllUsersData: UserDto[] = await this.userService.findAllUser();
    return { result: findAllUsersData, message: 'findAll' };
  }

  @Get('/users/:id')
  @OpenAPI({ summary: 'Return find a user' })
  async getUserById(@Param('id') userId: string) {
    const findOneUserData: UserDto = await this.userService.findUserById(userId);
    return { data: findOneUserData, message: 'findOne' };
  }

  @Get('/usrs/group/:id')
  @OpenAPI({ summary: 'Return list of users of a group' })
  async getUsersByGroup(@Param('id') groupId: string) {
    const findAllUsersData: UserDto[] = await this.userService.findUsersByGroup(groupId);
    return { result: findAllUsersData, message: 'findAll' };
  }

  @Post('/users')
  // @UseBefore(onlyAdminsMiddleware)
  @HttpCode(201)
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @OpenAPI({ summary: 'Create a new user' })
  async createUser(@Body() userData: CreateUserDto) {
    const createUserData: UserDto = await this.userService.createUser(userData);
    return { result: createUserData, message: 'created' };
  }
  @Put('/users/:id')
  @UseBefore(validationMiddleware(CreateUserDto, 'body', true))
  @OpenAPI({ summary: 'Update a user' })
  async updateUser(@CookieParam('Authorization') res: string, @Body() userData: CreateUserDto) {
    const userId = tokenToId(res);
    const updateUserData: Number = await this.userService.updateUser(userId, userData);
    return { data: updateUserData, message: 'updated' };
  }

  @Delete('/users')
  //@UseBefore(authMiddleware)
  @OpenAPI({ summary: 'Delete a user' })
  async deleteUser(@CookieParam('Authorization') res: string) {
    const userId = tokenToId(res);

    const deleteUserData: UserDto = await this.userService.deleteUser(userId);
    return { result: deleteUserData, message: 'deleted' };
  }
}
