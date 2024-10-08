import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import { editNotificationSettingsService } from '../services/notification-settings.services';

const editNotificationSettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      follow,
      comment,
      rating,
      likeComment,
      mention,
      favorite,
    } = req.body;
    const { userId } = req.user;

    await editNotificationSettingsService(
      userId,
      {
        follow,
        comment,
        rating,
        likeComment,
        mention,
        favorite,
      },
      res
    );

    res.status(200).json({
      message: 'notificationSettingsUpdated',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { editNotificationSettings };
