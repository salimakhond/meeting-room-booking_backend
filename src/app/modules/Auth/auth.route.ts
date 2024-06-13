import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  AuthControllers.createUser
);

router.post(
  '/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
