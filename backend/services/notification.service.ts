import { io } from '../app';
import logger from '../logger';
import Notification, {
  NotificationContext,
} from '../models/notification.model';
import { generateNotificationMessage } from '../utils/generateNotificationMessage';

const createNotification = async (
  userId: number,
  actorId: number,
  context: NotificationContext,
  ratingValue?: number
) => {
  try {
    const notification = await Notification.create({
      userId,
      actorId,
      context,
      read: false,
      ratingValue,
    });

    io.to(`notification_${userId}`).emit(
      'receiveNotification',
      {
        id: notification.get().id,
        actorId: notification.get().actorId,
        context: notification.get().context,
        message: generateNotificationMessage(context),
        createdAt: notification.get().createdAt,
      }
    );

    return notification;
  } catch (err) {
    logger.error('Error creating notification: ' + err);
  }
};

const getNotificationsService = async (
  userId: number,
  limit: number,
  offset: number
) => {
  const notifications = await Notification.findAndCountAll({
    limit,
    offset,
    where: {
      userId,
    },
  });

  return {
    count: notifications.count,
    notifications: notifications.rows.map(row => row.get()),
  };
};

const deleteNotificationService = async (
  notificationId: number
) => {
  await Notification.destroy({
    where: {
      id: notificationId,
    },
  });
};

export {
  createNotification,
  getNotificationsService,
  deleteNotificationService,
};
