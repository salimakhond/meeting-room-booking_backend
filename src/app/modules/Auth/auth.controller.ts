import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

//signup user
const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//login user
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, user } = result;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
