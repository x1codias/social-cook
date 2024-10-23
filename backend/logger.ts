import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({
      dirname: 'logs',
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'combined.log',
    }),
    new transports.File({
      dirname: 'logs',
      filename: 'passwords.log',
      level: 'password',
    }),
  ],
});

export default logger;
