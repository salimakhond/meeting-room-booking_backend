import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string()
      .email('Invalid email format. Please provide a valid email address.'),
    password: z
      .string({
        invalid_type_error: 'Password must be string',
      })
      .max(20, { message: 'Password can not be more then 20 character' })
      .optional(),
    phone: z.string({
      invalid_type_error: 'Phone must be string',
      required_error: 'Phone is required',
    }),
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({ message: 'role is not valid' }),
    }),
    address: z.string(),
  }),
});

export const userValidation = {
  userValidationSchema,
};
