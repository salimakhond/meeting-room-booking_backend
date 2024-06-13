import { Model, Types } from 'mongoose';

export type TBooking = {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  totalAmount?: number;
  isConfirmed?: 'confirmed' | 'unconfirmed' | 'canceled';
  isDeleted?: boolean;
};

export interface BookingModel extends Model<TBooking> {
  isBookingExists(id: string): Promise<TBooking | null>;
}
