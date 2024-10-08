import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import Followage from '../models/followage.model';
import { NotificationContext } from '../models/notification.model';
import Setting from '../models/setting.model';
import { createNotification } from './notification.service';

const followService = async (
  targetId: number,
  userId: number,
  res: Response
) => {
  const targetUserSettings = await Setting.findOne({
    where: {
      userId: targetId,
    },
  });

  if (!targetUserSettings) {
    return errorHandler(404, Errors.noSettings, res);
  }

  const existingFollow = await Followage.findOne({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });

  if (existingFollow) {
    return errorHandler(409, Errors.duplicateFollow, res);
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
  userId: number,
  res: Response
) => {
  const existingFollow = await Followage.findOne({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });

  if (!existingFollow) {
    return errorHandler(404, Errors.noFollow, res);
  }

  await Followage.destroy({
    where: {
      followerId: userId,
      userId: targetId,
    },
  });
};

export { followService, unFollowService };
