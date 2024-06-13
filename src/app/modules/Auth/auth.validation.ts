import { z } from 'zod';

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is requires' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthValidations = {
  loginUserValidationSchema,
};
