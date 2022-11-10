import { SECRET_KEY } from '@/configs-values';
import { DataStoredInToken } from '@/interfaces/auth.interface';
import config from 'config';
import jwt from 'jsonwebtoken';

export const tokenToId = (token: string) => {
  const secretKey: string = SECRET_KEY;
  const verificationResponse = jwt.verify(token, secretKey) as DataStoredInToken;
  const userId = verificationResponse.id;

  return userId;
};
