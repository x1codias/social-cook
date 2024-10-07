import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import Followage from '../models/followage.model';
import { AuthRequest } from './auth.controller';
import Setting from '../models/setting.model';
import { createNotification } from '../services/notification.service';
import { NotificationContext } from '../models/notification.model';

const follow = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

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
        userId: parseInt(targetId),
      },
    });

    if (existingFollow) {
      return errorHandler(409, Errors.duplicateFollow, res);
    }

    await Followage.create({
      userId: parseInt(targetId),
      followerId: userId,
      pending: targetUserSettings?.get().isPrivate,
    });

    await createNotification(
      parseInt(targetId),
      userId,
      NotificationContext.follow
    );

    res.status(200).json({
      message: 'followSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const unfollow = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    const existingFollow = await Followage.findOne({
      where: {
        followerId: userId,
        userId: parseInt(targetId),
      },
    });

    if (!existingFollow) {
      return errorHandler(404, Errors.noFollow, res);
    }

    await Followage.destroy({
      where: {
        followerId: userId,
        userId: parseInt(targetId),
      },
    });

    res.status(200).json({
      message: 'unfollowSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { follow, unfollow };
