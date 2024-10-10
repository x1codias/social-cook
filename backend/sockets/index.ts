import { DefaultEventsMap, Server } from 'socket.io';
import { notificationChannel } from './notification.socket';
import logger from '../logger';

const socketIntegration = (
  io: Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
  >
) => {
  io.on('connection', socket => {
    logger.info('A user connected: ' + socket.id);

    notificationChannel(socket);

    socket.on('disconnect', () => {
      logger.info('User disconnected: ' + socket.id);
    });
  });
};

export { socketIntegration };
