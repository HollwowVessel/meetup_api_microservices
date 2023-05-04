import express from 'express';

import { userController } from '../controllers/user';
import { checkDtoFit } from '../middlewares/checkDtoFit';
import { loginSchema, userSchema } from '../schemes/user';

export const router = express.Router();

router.post('/login', checkDtoFit(loginSchema), userController.login);
router.post(
  '/registration',
  checkDtoFit(userSchema),
  userController.registration
);
router.get('/refresh', userController.refreshToken);
