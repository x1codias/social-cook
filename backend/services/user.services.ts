import { Op } from 'sequelize';
import Followage from '../models/followage.model';
import User from '../models/user.model';
import sequelize from '../sequelize';
import { Errors } from '../controllers/error.controller';
import Recipe from '../models/recipe.model';

const getUsersFeedService = async (
  offset: number,
  limit: number,
  search: string
) => {
  const whereClause = search?.length
    ? { username: { [Op.like]: `%${search}%` } }
    : {};
  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    where: whereClause,
  });

  const userIds = rows.map(row => row.get().id) as number[];

  const followCounts = await Promise.all([
    // Count followers (users who follow the given users)
    Followage.findAll({
      where: {
        userId: { [Op.in]: userIds },
      },
      attributes: [
        'userId',
        [
          sequelize.fn(
            'COUNT',
            sequelize.col('followerId')
          ),
          'followersCount',
        ],
      ],
      group: ['userId'],
    }),

    // Count following (users that the given users are following)
    Followage.findAll({
      where: {
        followerId: { [Op.in]: userIds },
      },
      attributes: [
        'followerId',
        [
          sequelize.fn('COUNT', sequelize.col('userId')),
          'followingCount',
        ],
      ],
      group: ['followerId'],
    }),
  ]);

  // Transform results into maps for quick lookup
  const followersMap: { [key: number]: number } = {};
  followCounts[0].forEach(entry => {
    const { userId, followersCount } = entry.get({
      plain: true,
    });
    followersMap[userId] = followersCount;
  });

  const followingMap: { [key: number]: number } = {};
  followCounts[1].forEach(entry => {
    const { followerId, followingCount } = entry.get({
      plain: true,
    });
    followingMap[followerId] = followingCount;
  });

  const userRecipes = await Recipe.findAndCountAll({
    limit: 5,
    where: {
      userId: {
        [Op.in]: userIds,
      },
    },
    attributes: ['id', 'photos'],
  });

  const formattedUsers = rows.map(row => {
    const userId = row.get().id as number;
    return {
      ...row.get({ plain: true }),
      followersCount: followersMap[userId] || 0,
      followingCount: followingMap[userId] || 0,
      recipes: {
        total: userRecipes.count,
        data: userRecipes.rows.map(row =>
          row.get({ plain: true })
        ),
      },
    };
  });

  return {
    total: count,
    users: formattedUsers,
  };
};

const getUsersService = async (
  offset: number,
  limit: number,
  search: string
) => {
  const whereClause = search?.length
    ? { username: { [Op.like]: `%${search}%` } }
    : {};
  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    where: whereClause,
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

  const formattedUsers = rows.map(row => {
    return {
      ...row.get({ plain: true }),
      followersCount:
        followersCountMap[row.get().id as number] || 0,
    };
  });

  return {
    total: count,
    users: formattedUsers,
  };
};

const getUserService = async (userId: number) => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error(Errors.userNotFound);
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

const getUserRecipesService = async (
  userId: number,
  limit: number,
  offset: number
) => {
  const userRecipes = await Recipe.findAndCountAll({
    limit,
    offset,
    where: {
      userId,
    },
  });

  return {
    count: userRecipes.count,
    recipes: userRecipes.rows.map(row => row.get()),
  };
};

const editUserService = async () => {};

export {
  getUsersService,
  getUsersFeedService,
  getUserService,
  editUserService,
  getUserRecipesService,
};
