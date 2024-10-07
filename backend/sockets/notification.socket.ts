import { DefaultEventsMap, Socket } from 'socket.io';
import { logger } from '../app';

export const notificationChannel = (
  socket: Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  >
) => {
  socket.on('join', userId => {
    logger.info(
      `User ${userId} joined their notification channel`
    );
    socket.join(`user_${userId}`);
  });
};
