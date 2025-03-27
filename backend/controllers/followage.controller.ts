import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  followService,
  unFollowService,
} from '../services/followage.services';

const follow = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await followService(parseInt(targetId), userId);

    res.status(200).json({
      message: 'followSuccessfull',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const unfollow = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await unFollowService(parseInt(targetId), userId);

    res.status(200).json({
      message: 'unfollowSuccessfull',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

export { follow, unfollow };
