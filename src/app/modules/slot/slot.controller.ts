import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SlotServices } from './slot.service';

// Create Slot Controller
const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

// Get Available Slots Controller
const getAvailableSlots = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;

  const availableSlots = await SlotServices.getAvailableSlotsFormDB(
    date as string,
    roomId as string
  );

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Available slots retrieved successfully',
    data: availableSlots,
  });
});

export const SlotController = {
  createSlot,
  getAvailableSlots,
};
