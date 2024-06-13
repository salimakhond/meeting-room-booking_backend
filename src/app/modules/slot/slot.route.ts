import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SlotController } from './slot.controller';
import { SlotValidations } from './slot.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Slot Route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotController.createSlot
);

// Get Available Slots Route
router.get('/availability', SlotController.getAvailableSlots);

export const SlotRoutes = router;
