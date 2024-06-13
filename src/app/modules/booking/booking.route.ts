import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Booking Route
router.post(
  '/bookings',
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

//Get All Bookings route
router.get('/bookings', auth(USER_ROLE.admin), BookingController.getAllBooking);

// Update Bookings route
router.put(
  '/bookings/:id',
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingController.getUserBookings
);

export const BookingRoutes = router;
