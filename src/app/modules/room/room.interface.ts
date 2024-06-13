import { Model } from 'mongoose';

export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted?: boolean;
};

export interface RoomModel extends Model<TRoom> {
  isRoomExists(id: string): Promise<TRoom | null>;
}
