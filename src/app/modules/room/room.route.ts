import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { RoomController } from './room.controller';
import { roomValidation } from './room.validation';

const router = express.Router();

// Create Room Route
router.post(
  '/',
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
  validateRequest(roomValidation.updateRoomValidationSchema),
  RoomController.updateRoom
);

// Deleted Room Route
router.delete('/:id', RoomController.deleteRoom);

export const RoomRoutes = router;
