import { db, userQueries } from '../db';

export const checkAuth = async (
  jwtPayload: { id: any },
  done: (arg0: unknown, arg1: boolean) => any
) => {
  try {
    const user = await db.oneOrNone(userQueries.getById, [jwtPayload.id]);

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};
