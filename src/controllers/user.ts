import { type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { REFRESH_TOKEN_SECRET } from '../constants';
import { FORBIDDEN, SUCCESS } from '../constants/httpMessages';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/jwtInfo';
import { db, userQueries } from '../db';
import { userPatchSchema } from '../schemes/user';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { userService } from '../services/user';
import { type UserInfo } from '../types';
import { createTokens } from '../utils/createTokens';
import { getMaxAge } from '../utils/getMaxAge';
import { sendMessage } from '../utils/sendMessage';

export class UserController {
  async getUsers(_: unknown, res: Response) {
    try {
      const data = await db.many(userQueries.getAll);

      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const {
        params: { id },
      } = req;
      const data = await db.one(userQueries.getById, [id]);

      res.status(200).json({ ...data });
    } catch (err) {
      console.log(err);
    }
  }

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

  async fillProfile(req: Request, res: Response) {
    await userPatchSchema.validateAsync(req.body);

    const { refreshToken } = req.cookies;

    const { id: userId } = verify(
      refreshToken,
      REFRESH_TOKEN_SECRET!
    ) as IJWTInfo;
    const {
      params: { id },
    } = req;
    const { password, username, email, sex, name } = req.body;

    if (Number(id) !== Number(userId)) {
      res.status(403).json({ message: FORBIDDEN });
      return;
    }

    await userService.fillProfile({
      id: Number(id),
      username,
      password,
      email,
      sex,
      name,
    });

    res.status(200).json({ message: SUCCESS });
  }
}

export const userController = new UserController();
