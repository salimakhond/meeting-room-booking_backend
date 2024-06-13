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
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

//Get All Bookings route
router.get('/bookings', auth(USER_ROLE.admin), BookingController.getAllBooking);

// Get User's Bookings route
router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingController.getUserBookings
);

// Update Bookings route
router.put(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.updateBookingValidationSchema),
  BookingController.updateBooking
);

// Deleted Booking Route
router.delete(
  '/bookings/:id',
  auth(USER_ROLE.admin),
  BookingController.deleteBooking
);

export const BookingRoutes = router;
