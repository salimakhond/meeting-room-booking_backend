import httpStatus from 'http-status';
import AppError from '../../errors/App.Error';
import { Room } from '../room/room.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import createSlots from './slot.utility';

// Create Slot Service
const createSlotIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, date, room } = payload;

  const roomId: any = payload?.room;
  const roomInfo = await Room.isRoomExists(roomId);

  //check room available or not
  if (!roomInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found!');
  }

  //check room is deleted or not
  if (roomInfo.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Can't create slots, This room deleted!"
    );
  }

  const slots = createSlots(startTime, endTime, date, room);

  const result = await Slot.create(slots);
  return result;
};

// Get Available Slots Service
const getAvailableSlotsFormDB = async (date?: string, roomId?: string) => {
  //   Check searching roomId is valid
  const existingRoom = await Room.findById(roomId as any);
  if (!existingRoom) {
    throw new AppError(httpStatus.NOT_FOUND, 'slot not found');
  }

  // Check searching date is valid
  if (date) {
    const availableSlotsCount = await Slot.countDocuments({
      date,
      isBooked: false,
    });
    if (availableSlotsCount === 0) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No available slots for this date'
      );
    }
  }

  const query: any = {
    isBooked: false,
  };

  // get date and/or roomId
  if (date) {
    query.date = date;
  } else if (date) {
  }
  if (roomId) {
    query.room = roomId;
  }

  const result = await Slot.find(query);
  return result;
};

export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFormDB,
};
