import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ACCESS_TOKEN_SECRET } from '../constants';
import { FORBIDDEN, NOT_FOUND } from '../constants/httpMessages';
import { db, meetupQueries } from '../db';
import { type IJWTInfo } from '../schemes/user/interfaces';

export const checkPermission =
  (roles: 'creator') =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: reqId } = req.params;

      const { accessToken } = req.cookies;

      const { id, role } = verify(
        accessToken,
        ACCESS_TOKEN_SECRET!
      ) as IJWTInfo;

      if (role !== roles) {
        res.status(403).json({ err: FORBIDDEN });
        return;
      }

      if (!reqId && role === roles) {
        next();
        return;
      }

      const { creator_id: creatorId } = await db.oneOrNone(
        meetupQueries.getOne,
        [reqId]
      );

      if (creatorId !== id) {
        res.status(403).json({ err: FORBIDDEN });
        return;
      }

      next();
    } catch (err) {
      res.status(404).json({ err: NOT_FOUND });
    }
  };
