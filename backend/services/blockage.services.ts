import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import Blockage from '../models/blockage.model';

const blockService = async (
  userId: number,
  targetId: number,
  res: Response
) => {
  const existingBlock = await Blockage.findOne({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });

  if (existingBlock) {
    return errorHandler(409, Errors.duplicateBlock, res);
  }

  await Blockage.create({
    userId: targetId,
    blockedId: userId,
  });
};

const unBlockService = async (
  userId: number,
  targetId: number,
  res: Response
) => {
  const existingBlock = await Blockage.findOne({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });

  if (!existingBlock) {
    return errorHandler(404, Errors.noBlock, res);
  }

  await Blockage.destroy({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });
};

export { blockService, unBlockService };
