import { Errors } from '../controllers/error.controller';
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
  }
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
    throw new Error(Errors.noNotificationSettings);
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
