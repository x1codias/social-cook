import { Errors } from '../controllers/error.controller';
import Followage from '../models/followage.model';
import { NotificationContext } from '../models/notification.model';
import Setting from '../models/setting.model';
import { createNotification } from './notification.service';

const followService = async (
  targetId: number,
  userId: number
) => {
  const targetUserSettings = await Setting.findOne({
    where: {
      userId: targetId,
    },
  });

  if (!targetUserSettings) {
    throw new Error(Errors.noSettings);
  }

  const existingFollow = await Followage.findOne({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });

  if (existingFollow) {
    throw new Error(Errors.duplicateFollow);
  }

  await Followage.create({
    userId: targetId,
    followerId: userId,
    pending: targetUserSettings?.get().isPrivate,
  });

  await createNotification(
    targetId,
    userId,
    NotificationContext.follow
  );
};

const unFollowService = async (
  targetId: number,
  userId: number
) => {
  const existingFollow = await Followage.findOne({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });

  if (!existingFollow) {
    throw new Error(Errors.noFollow);
  }

  await Followage.destroy({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });
};

export { followService, unFollowService };
