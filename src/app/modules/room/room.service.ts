import httpStatus from 'http-status';
import AppError from '../../errors/App.Error';
import { TRoom } from './room.interface';
import { Room } from './room.model';

// Create Room Service
const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

// Get Single Room Service
const getSingleRoomFromDB = async (id: string) => {
  // check room is exists
  const isRoomExists = await Room.isRoomExists(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This room is not found !');
  }

  const result = await Room.findById(id);
  return result;
};

// Get All Room Service
const getAllRoomFromDB = async () => {
  const result = await Room.find();
  return result;
};

// Update Room Service
const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  // check room is exists
  const isRoomExists = await Room.isRoomExists(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This room is not found !');
  }

  // room is deleted
  if (isRoomExists?.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Can't update room, This room deleted !"
    );
  }

  // unique roomNo check
  if (payload?.roomNo === isRoomExists?.roomNo) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `${isRoomExists?.roomNo} roomNo already exist !! roomNo Always unique`
    );
  }

  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// Deleted Room Service
const deleteRoomFromDB = async (id: string) => {
  // check room is exists
  const isRoomExists = await Room.isRoomExists(id);

  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This room is not found !');
  }

  // room is deleted
  if (isRoomExists?.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This room is already deleted !');
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
