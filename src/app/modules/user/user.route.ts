import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
