import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import User from '../models/user.model';
import Followage from '../models/followage.model';
import { Op } from 'sequelize';
import sequelize from '../sequelize';

const users = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const username = (req.query.username as string) || '';

    const { count, rows } = await User.findAndCountAll({
      offset,
      limit,
      where: {
        username: { [Op.eq]: username },
      },
    });

    const userIds = rows.map(
      row => row.get().id
    ) as number[];

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

    res.status(200).json({
      total: count,
      users: formattedUsers,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const user = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return errorHandler(404, 'noUserFound', res);
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

    res.status(200).json({
      user: formattedUser,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const editUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { users, user };
