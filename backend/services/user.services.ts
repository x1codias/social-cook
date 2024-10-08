import { Op } from 'sequelize';
import Followage from '../models/followage.model';
import User from '../models/user.model';
import sequelize from '../sequelize';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { Response } from 'express';

const getUsersService = async (
  offset: number,
  limit: number,
  username: string
) => {
  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    where: {
      username: { [Op.eq]: username },
    },
  });

  const userIds = rows.map(row => row.get().id) as number[];

  const followers = await Followage.findAll({
    where: {
      userId: {
        [Op.in]: userIds,
      },
    },
    attributes: [
      'userId',
      [
        sequelize.fn('COUNT', sequelize.col('userId')),
        'count',
      ],
    ],
    group: ['userId'],
  });

  const followersCountMap: { [key: number]: number } = {};
  followers.map(entry => {
    followersCountMap[entry.get().userId] =
      entry.getDataValue('count') as number;
  });

  const formattedUsers = rows.map(async row => {
    return {
      ...row.dataValues,
      followersCount:
        followersCountMap[row.get().id as number] || 0,
    };
  });

  return {
    total: count,
    users: formattedUsers,
  };
};

const getUserService = async (
  userId: number,
  res: Response
) => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return errorHandler(404, Errors.userNotFound, res);
  }

  const followersCount = await Followage.count({
    where: {
      userId: user.get().id,
    },
  });

  const formattedUser = {
    ...user?.dataValues,
    followersCount,
  };

  return {
    user: formattedUser,
  };
};

const editUserService = async () => {};

export { getUsersService, getUserService, editUserService };
