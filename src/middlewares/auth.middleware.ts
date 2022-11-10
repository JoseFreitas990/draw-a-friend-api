import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { injector } from '@/inversify.config';
import IUserService from '@/interfaces/user/user_service.interface';
import { TYPES } from '@/types';
import config from 'config';
import { SECRET_KEY } from '@/configs-values';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userService = injector.get<IUserService>(TYPES.IUserService);
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
    if (Authorization) {
      const secretKey: string = SECRET_KEY;

      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await userService.findUserById(userId);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token 1'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    console.log(error);
    next(new HttpException(401, 'Wrong authentication token 2'));
  }
};

export default authMiddleware;
