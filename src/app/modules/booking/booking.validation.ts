import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    slots: z.array(z.string()),
    room: z.string(),
    user: z.string(),
  }),
});

export const bookingValidation = {
  createBookingValidationSchema,
};
