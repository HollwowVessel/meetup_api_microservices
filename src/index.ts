import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { join } from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { passportOption } from './config';
import { PORT, SIGTERM } from './constants';
import { checkAuth } from './middlewares/checkAuth';
import { meetupRouter, userRouter } from './routes';
const app = express();

const swaggerDocument = YAML.load(join(__dirname, 'swagger.yaml'));

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

const port = Number(PORT) || 4000;

passport.use(new JWTStrategy(passportOption, checkAuth));

app.use(express.json());
app.use(cookieParser());

app.use(
  '/meetup',
  passport.authenticate('jwt', { session: false }),
  meetupRouter
);
app.use('/auth', userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
