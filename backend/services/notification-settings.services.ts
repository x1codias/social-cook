import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import NotificationSetting from '../models/notification-setting.model';

export const editNotificationSettingsService = async (
  userId: number,
  settings: {
    follow: boolean;
    comment: boolean;
    rating: boolean;
    likeComment: boolean;
    mention: boolean;
    favorite: boolean;
  },
  res: Response
) => {
  const {
    follow,
    comment,
    rating,
    likeComment,
    mention,
    favorite,
  } = settings;
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
    favorite,
  });

  await notificationSettingToUpdate.save();
};
