import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Booking Route
router.post(
  '/',
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

//Get All Bookings route
router.get('/', auth(USER_ROLE.admin), BookingController.getAllBooking);

// Update Bookings route
router.put(
  '/:id',
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking
);

export const BookingRoutes = router;
