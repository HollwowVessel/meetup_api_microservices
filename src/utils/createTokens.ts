import { sign } from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { type UserData } from '../types';

export const createTokens = (userData: UserData) => {
  const accessToken = sign(userData, ACCESS_TOKEN_SECRET!, {
    expiresIn: ACCESS_TOKEN_LIFETIME,
  });

  const refreshToken = sign(userData, REFRESH_TOKEN_SECRET!, {
    expiresIn: REFRESH_TOKEN_LIFETIME,
  });

  return { accessToken, refreshToken };
};
