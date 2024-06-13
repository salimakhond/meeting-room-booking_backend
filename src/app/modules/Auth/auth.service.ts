import config from '../../config';
import { TUser } from '../user/user.interface';
import { TLoginUser } from './auth.interface';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import AppError from '../../errors/App.Error';
import httpStatus from 'http-status';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  // check user exists
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exists!');
  }
  // check password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Password do not matched!');
  }
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });
  return {
    accessToken: `Bearer ${accessToken}`,
    user,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
