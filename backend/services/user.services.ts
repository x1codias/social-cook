import { Model, Op } from 'sequelize';
import Followage from '../models/followage.model';
import User from '../models/user.model';
import sequelize from '../sequelize';
import { Errors } from '../controllers/error.controller';
import Recipe, { RecipeType } from '../models/recipe.model';

const getUsersService = async (
  search: string,
  attributes: string[],
  offset?: number,
  limit?: number,
  includeRecipes?: boolean
) => {
  const whereClause = search?.length
    ? { username: { [Op.like]: `%${search}%` } }
    : {};

  const { count, rows } = await User.findAndCountAll({
    offset: offset || 0,
    limit: limit || 10,
    where: whereClause,
    attributes: attributes,
  });

  const userIds = rows.map(row => row.get().id) as number[];

  let followersMap: { [key: number]: number } = {};
  let followingMap: { [key: number]: number } = {};

  if (!includeRecipes) {
    // Only fetch followers count if recipes are included
    const followersCountData = await Followage.findAll({
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
    });

    // Transform results into a map
    followersCountData.forEach(entry => {
      const { userId, followersCount } = entry.get({
        plain: true,
      });
      followersMap[userId] = followersCount;
    });
  } else {
    // Fetch both followers and following counts
    const followCounts = await Promise.all([
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

    // Map followers count
    followCounts[0].forEach(entry => {
      const { userId, followersCount } = entry.get({
        plain: true,
      });
      followersMap[userId] = followersCount;
    });

    // Map following count
    followCounts[1].forEach(entry => {
      const { followerId, followingCount } = entry.get({
        plain: true,
      });
      followingMap[followerId] = followingCount;
    });
  }

  let userRecipes: {
    rows: Model<RecipeType, RecipeType>[];
    count: number;
  } = { rows: [], count: 0 };

  if (includeRecipes) {
    userRecipes = await Recipe.findAndCountAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
      },
      attributes: ['id', 'photos', 'userId'],
    });
  }

  const formattedUsers = rows.map(row => {
    const userId = row.get().id as number;
    const filteredRecipes = userRecipes.rows.filter(
      recipeRow => recipeRow.get().userId === userId
    );
    return {
      ...row.get({ plain: true }),
      followersCount: followersMap[userId] || 0,
      followingCount: !includeRecipes
        ? undefined
        : followingMap[userId] || 0,
      recipes: includeRecipes
        ? {
            total: filteredRecipes.length,
            data: filteredRecipes.map(row =>
              row.get({ plain: true })
            ),
          }
        : undefined,
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
