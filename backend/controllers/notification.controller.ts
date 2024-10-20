import { AuthRequest } from './auth.controller';
import { Response } from 'express';
import { errorHandler } from './error.controller';
import {
  deleteNotificationService,
  getNotificationsService,
} from '../services/notification.service';

const notifications = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { notifications } = await getNotificationsService(
      userId,
      limit,
      offset
    );

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const deleteNotification = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { notificationId } = req.params;

    await deleteNotificationService(
      parseInt(notificationId)
    );

    res.status(200).json({
      message: 'notificationDeleted',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { notifications, deleteNotification };
