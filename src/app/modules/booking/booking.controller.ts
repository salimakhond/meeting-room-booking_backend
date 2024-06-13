import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

// Create Booking Controller
const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

//Get All Bookings controller
const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

//Get User's Bookings Controller
const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.getUserBookingsFromDB(user);
  sendResponse(res, {
    statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'User bookings retrieved successfully',
    data: result,
  });
});

// Update Booking
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.updateBookingIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

// Deleted Booking Controller
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getUserBookings,
  updateBooking,
  deleteBooking,
};
