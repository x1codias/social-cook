import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import NotificationSetting from '../models/notification-setting.model';

const editNotificationSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      follow,
      comment,
      rating,
      likeComment,
      mention,
    } = req.body;
    const { userId } = req.params;

    const notificationSettingToUpdate =
      await NotificationSetting.findOne({
        where: { userId },
      });

    if (!notificationSettingToUpdate) {
      return errorHandler(
        404,
        Errors.noNotificationSettings,
        res
      );
    }

    await notificationSettingToUpdate.update({
      follow,
      comment,
      rating,
      likeComment,
      mention,
    });

    await notificationSettingToUpdate.save();

    res.status(200).json({
      message: 'notificationSettingsUpdated',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { editNotificationSettings };
