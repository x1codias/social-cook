import { io, logger } from '../app';
import Notification, {
  NotificationContext,
} from '../models/notification.model';
import { generateNotificationMessage } from '../utils/generateNotificationMessage';

export const createNotification = async (
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

    io.to(`user_${userId}`).emit('receiveNotification', {
      id: notification.get().id,
      actorId: notification.get().actorId,
      context: notification.get().context,
      message: generateNotificationMessage(
        NotificationContext.rating
      ),
      createdAt: notification.get().createdAt,
    });

    return notification;
  } catch (err) {
    logger.error('Error creating notification: ' + err);
  }
};
