import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  blockService,
  unBlockService,
} from '../services/blockage.services';

const block = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await blockService(userId, parseInt(targetId));

    res.status(200).json({
      message: 'blockSuccessfull',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const unblock = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await unBlockService(userId, parseInt(targetId));

    res.status(200).json({
      message: 'unblockSuccessfull',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

export { block, unblock };
