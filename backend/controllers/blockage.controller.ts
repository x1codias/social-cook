import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  blockService,
  unBlockService,
} from '../services/blockage.services';

const block = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await blockService(userId, parseInt(targetId), res);

    res.status(200).json({
      message: 'blockSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const unblock = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    await unBlockService(userId, parseInt(targetId), res);

    res.status(200).json({
      message: 'unblockSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { block, unblock };
