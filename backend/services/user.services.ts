import { Op } from 'sequelize';
import Followage from '../models/followage.model';
import User from '../models/user.model';
import sequelize from '../sequelize';
import { Errors } from '../controllers/error.controller';
import Recipe from '../models/recipe.model';

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
  getUserService,
  editUserService,
  getUserRecipesService,
};
