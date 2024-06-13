import { z } from 'zod';

// Create Room Zod Validation Schema
const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number().int(),
    capacity: z.number().int(),
    pricePerSlot: z.number().int(),
    amenities: z.array(z.string()),
    isDeleted: z.boolean().optional(),
  }),
});

// Update Room Zod Validation Schema
const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    roomNo: z.number().optional(),
    floorNo: z.number().int().optional(),
    capacity: z.number().int().optional(),
    pricePerSlot: z.number().int().optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const roomValidation = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
