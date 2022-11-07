import { Container } from 'inversify';
import IAuthService from './interfaces/auth.interface';
import IDrawRepository from './interfaces/draw/draw_repo.interface';
import IDrawService from './interfaces/draw/draw_service.interface';
import IGroupRepository from './interfaces/group/group_repo.interface';
import IGroupService from './interfaces/group/group_service.interface';
import IUserRepository from './interfaces/user/user_repo.interface';
import IUserService from './interfaces/user/user_service.interface';
import { DrawRepository } from './repositories/draw.repository';
import { GroupRepository } from './repositories/group.repository';
import { UserRepository } from './repositories/users.repository';
import AuthService from './services/auth.service';
import { DrawService } from './services/draw.service';
import { GroupService } from './services/group.service';
import { UserService } from './services/users.service';
import { TYPES } from './types';

const injector = new Container();

injector.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

injector.bind<IUserService>(TYPES.IUserService).to(UserService);
injector.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

injector.bind<IGroupService>(TYPES.IGroupService).to(GroupService);
injector.bind<IGroupRepository>(TYPES.IGroupRepository).to(GroupRepository);

injector.bind<IDrawService>(TYPES.IDrawService).to(DrawService);
injector.bind<IDrawRepository>(TYPES.IDrawRepository).to(DrawRepository);

export { injector };
