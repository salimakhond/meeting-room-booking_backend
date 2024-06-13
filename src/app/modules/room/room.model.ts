import { Schema, model } from 'mongoose';
import { RoomModel, TRoom } from './room.interface';

const roomSchema = new Schema<TRoom>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  roomNo: {
    type: Number,
    required: [true, 'Room-No is required'],
    unique: true,
  },
  floorNo: {
    type: Number,
    required: [true, 'Floor-No is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
  },
  pricePerSlot: {
    type: Number,
    required: [true, 'Price Per Slot is required'],
  },
  amenities: {
    type: [String],
    required: [true, 'Amenities is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//checking if room is already exist!
roomSchema.statics.isRoomExists = async function (id: string) {
  return await Room.findById(id);
};

export const Room = model<TRoom, RoomModel>('Room', roomSchema);
