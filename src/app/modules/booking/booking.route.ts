import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingValidation } from './booking.validation';
import { BookingController } from './booking.controller';

const router = express.Router();

// Create Booking Route
router.post(
  '/',
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingController.createBooking
);

//Get All Bookings route
router.get('/', BookingController.getAllBooking);

export const BookingRoutes = router;
