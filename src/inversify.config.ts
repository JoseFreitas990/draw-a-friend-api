import { Container } from 'inversify';
import IAuthService from './interfaces/auth.interface';
import IUserRepository from './interfaces/user/user_repo.interface';
import IUserService from './interfaces/user/user_service.interface';
import { UserRepository } from './repositories/users.repository';
import AuthService from './services/auth.service';
import { UserService } from './services/users.service';
import { TYPES } from './types';

const injector = new Container();

injector.bind<IAuthService>(TYPES.IAuthService).to(AuthService);

injector.bind<IUserService>(TYPES.IUserService).to(UserService);
injector.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export { injector };
