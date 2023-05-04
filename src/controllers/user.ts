import { type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { REFRESH_TOKEN_SECRET } from '../constants';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { userService } from '../services/user';
import { type UserInfo } from '../types';
import { createTokens } from '../utils/createTokens';
import { getMaxAge } from '../utils/getMaxAge';
import { sendMessage } from '../utils/sendMessage';

export class UserController {
  async registration(req: Request, res: Response) {
    const { email, username, password, role } = req.body;

    const data = await userService.registration({
      username,
      email,
      password,
      role,
    });

    sendMessage(data, res);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const data = await userService.login({ email, password });

    res
      .status(data.status)
      .cookie('accessToken', (data.result as UserInfo).accessToken, {
        maxAge: getMaxAge(ACCESS_TOKEN_LIFETIME),
      })
      .cookie('refreshToken', (data.result as UserInfo).refreshToken, {
        maxAge: getMaxAge(REFRESH_TOKEN_LIFETIME),
      })
      .json(data.result);
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      res.status(401).json({ err: true, result: 'Unauthorized' });
      return;
    }

    const { id, email, username, role } = verify(
      refreshToken,
      REFRESH_TOKEN_SECRET!
    ) as IJWTInfo;

    const userData = { id, username, email, role };

    const { accessToken } = createTokens(userData);

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        maxAge: getMaxAge(ACCESS_TOKEN_LIFETIME),
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: getMaxAge(REFRESH_TOKEN_LIFETIME),
      })
      .send({ accessToken, refreshToken });
  }
}

export const userController = new UserController();
