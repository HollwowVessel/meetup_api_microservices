import express from 'express';

import { userController } from '../controllers/user';
import { checkDtoFit } from '../middlewares/checkDtoFit';
import { checkPermission } from '../middlewares/checkPermission';
import { loginSchema, userSchema } from '../schemes/user';

export const router = express.Router();

router.post('/login', checkDtoFit(loginSchema), userController.login);
router.post(
  '/registration',
  checkDtoFit(userSchema),
  userController.registration
);
router.get('/refresh', userController.refreshToken);
router.patch('/fill_profile/:id', userController.fillProfile);
router.get('/', checkPermission('creator'), userController.getUsers);
router.get('/:id', userController.getUser);
