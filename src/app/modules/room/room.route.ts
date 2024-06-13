import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { RoomController } from './room.controller';
import { roomValidation } from './room.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Room Route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(roomValidation.createRoomValidationSchema),
  RoomController.createRoom
);

// Get Single Room Route
router.get('/:id', RoomController.getSingleRoom);

// Get All Room Route
router.get('/', RoomController.getAllRoom);

// Update Room Route
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(roomValidation.updateRoomValidationSchema),
  RoomController.updateRoom
);

// Deleted Room Route
router.delete('/:id', auth(USER_ROLE.admin), RoomController.deleteRoom);

export const RoomRoutes = router;
