import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';
import { DrawController } from './controllers/draw.controller';
import { GroupController } from './controllers/group.controller';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, GroupController, DrawController]);
app.listen();
