import { Container } from 'inversify';
import IUserRepository from './interfaces/user/user_repo.interface';
import IUserService from './interfaces/user/user_service.interface';
import { UserRepository } from './repositories/users.repository';
import { UserService } from './services/users.service';
import { TYPES } from './types';

const injector = new Container();

injector.bind<IUserService>(TYPES.IUserService).to(UserService);
injector.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export { injector };
