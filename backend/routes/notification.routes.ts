import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  notifications,
  deleteNotification,
} from '../controllers/notification.controller';

const notificationRoutes = Router();

notificationRoutes.get('/', verifyToken, notifications);
notificationRoutes.delete(
  '/:id',
  verifyToken,
  deleteNotification
);

export default notificationRoutes;
