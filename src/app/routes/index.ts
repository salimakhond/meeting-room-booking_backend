import { Router } from 'express';
import { RoomRoutes } from '../modules/room/room.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AuthRoutes } from '../modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
