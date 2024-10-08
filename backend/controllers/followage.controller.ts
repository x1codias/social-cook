import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  followService,
  unFollowService,
} from '../services/followage.services';

const follow = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await followService(parseInt(targetId), userId, res);

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

    await unFollowService(parseInt(targetId), userId, res);

    res.status(200).json({
      message: 'unfollowSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { follow, unfollow };
