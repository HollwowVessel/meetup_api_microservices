import bcrypt from 'bcrypt';

import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/httpMessages';
import { db, userQueries } from '../db';
import { type Result } from '../types';
import { createTokens } from '../utils/createTokens';
import { type LoginProps, type RegistrationProps } from './types';

class UserService {
  async registration({
    email,
    password,
    role = 'user',
    username,
  }: RegistrationProps): Promise<Result> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.one(userQueries.create, {
        username,
        email,
        password: hashedPassword,
        role,
      });

      return {
        result: user,
        status: 201,
      };
    } catch (err) {
      return { status: 500, err: true, result: (err as Error).message };
    }
  }

  async login({ email, password }: LoginProps): Promise<Result> {
    try {
      const {
        password: userPassword,
        id,
        username,
        role,
      } = await db.oneOrNone(userQueries.getByEmail, email);

      const check = await bcrypt.compare(password, userPassword);

      if (!check) {
        return {
          result: 'Email or password is incorrect',
          status: 400,
          err: true,
        };
      }

      const { refreshToken, accessToken } = createTokens({
        id,
        email,
        username,
        role,
      });

      await db.any(userQueries.updateToken, [refreshToken, id]);

      return {
        status: 200,
        result: {
          accessToken,
          refreshToken,
          username,
          role,
          id,
          email,
        },
      };
    } catch (err) {
      return {
        status: 404,
        err: true,
        result: NOT_FOUND,
      };
    }
  }
}

export const userService = new UserService();
