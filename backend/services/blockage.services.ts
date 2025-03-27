import { Errors } from '../controllers/error.controller';
import Blockage from '../models/blockage.model';

const blockService = async (
  userId: number,
  targetId: number
) => {
  const existingBlock = await Blockage.findOne({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });

  if (existingBlock) {
    throw new Error(Errors.duplicateBlock);
  }

  await Blockage.create({
    userId: targetId,
    blockedId: userId,
  });
};

const unBlockService = async (
  userId: number,
  targetId: number
) => {
  const existingBlock = await Blockage.findOne({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });

  if (!existingBlock) {
    throw new Error(Errors.noBlock);
  }

  await Blockage.destroy({
    where: {
      blockedId: userId,
      userId: targetId,
    },
  });
};

export { blockService, unBlockService };
