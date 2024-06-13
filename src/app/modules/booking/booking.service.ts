import httpStatus from 'http-status';
import { Room } from '../room/room.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';
import AppError from '../../errors/App.Error';
import { User } from '../user/user.model';

// Create Booking Service
const createBookingIntoDB = async (payload: TBooking) => {
  const { room, slots, date, user } = payload;

  //   console.log(payload);

  // Check is user exists
  const isExistingUser = await User.findById(user);
  if (!isExistingUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //check is room exists
  const isExistingRoom = await Room.findById(room);
  if (!isExistingRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Room not found!');
  }

  // check room deleted
  if (isExistingRoom.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Unable to booking, this room is deleted'
    );
  }

  // Check slots are available this date
  const availableSlotsCount = await Slot.countDocuments({
    date,
    isBooked: false,
  });

  if (availableSlotsCount === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `No available slots this date: ${date} `
    );
  }

  // Check all slots exist
  const isExistingSlots = [];
  for (const slotId of slots) {
    const existingSlot = await Slot.findById(slotId);
    if (!existingSlot) {
      isExistingSlots.push(slotId);
    }
  }

  if (isExistingSlots.length > 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This Slot not found: ${isExistingSlots.join(', ')}`
    );
  }

  // Check slots array is empty
  if (!Array.isArray(slots) || slots.length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'At least one slot must be provided'
    );
  }

  // Check slots array duplicate slots
  const uniqueSlots = [...new Set(slots)];
  if (uniqueSlots.length !== slots.length) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Duplicate slots are not allowed'
    );
  }

  // Check slots are already booked
  const bookedSlots = await Slot.find({ _id: { $in: slots }, isBooked: true });
  if (bookedSlots.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This slots are already booked');
  }

  // total amount slots booked
  const totalAmount = slots.length * isExistingRoom.pricePerSlot;

  const createdBooking = await Booking.create({
    ...payload,
    totalAmount,
  });

  // Populate room, slots, and user fields in the booking
  const result = await Booking.findById(createdBooking._id)
    .populate('room')
    .populate('slots')
    .populate('user');

  return result;
};

//Get All Bookings service
const getAllBookingFromDB = async () => {
  const result = await Booking.find()
    .populate('room')
    .populate('slots')
    .populate('user');
  return result;
};

// Update Booking Service
const updateBookingIntoDB = async (id: string, payload: Partial<TBooking>) => {
  // check Booking is exists
  const isBookingExists = await Booking.isBookingExists(id);

  if (!isBookingExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking is not found !');
  }

  // booking is deleted
  if (isBookingExists?.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Can't update booking, This booking deleted !"
    );
  }

  const result = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  updateBookingIntoDB,
};
