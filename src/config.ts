import { ExtractJwt } from 'passport-jwt';

import { ACCESS_TOKEN_SECRET } from './constants';

export const passportOption = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};
