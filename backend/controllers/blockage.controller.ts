import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import Blockage from '../models/blockage.model';
import { AuthRequest } from './auth.controller';

const block = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;
    const { targetId } = req.params;

    const existingBlock = await Blockage.findOne({
      where: {
        blockedId: userId,
        userId: parseInt(targetId),
      },
    });

    if (existingBlock) {
      return errorHandler(409, Errors.duplicateBlock, res);
    }

    await Blockage.create({
      userId: parseInt(targetId),
      blockedId: userId,
    });

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

    const existingBlock = await Blockage.findOne({
      where: {
        blockedId: userId,
        userId: parseInt(targetId),
      },
    });

    if (!existingBlock) {
      return errorHandler(404, Errors.noBlock, res);
    }

    await Blockage.destroy({
      where: {
        blockedId: userId,
        userId: parseInt(targetId),
      },
    });

    res.status(200).json({
      message: 'unblockSuccessfull',
    });
  } catch (err) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { block, unblock };
