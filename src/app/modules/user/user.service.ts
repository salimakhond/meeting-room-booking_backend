import { TUser } from './user.interface';
import { User } from './user.model';

// Create User Service
const createUserIntoDB = async (payload: TUser) => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
