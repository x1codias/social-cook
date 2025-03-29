import { col, fn, Op } from 'sequelize';
import Favorite from '../models/favorite.model';
import Recipe from '../models/recipe.model';
import { Errors } from '../controllers/error.controller';
import { createNotification } from './notification.service';
import { NotificationContext } from '../models/notification.model';
import User from '../models/user.model';
import Rating from '../models/rating.model';

const getFavoritesService = async (
  userId: number,
  offset: number,
  limit: number
) => {
  const favorites = await Favorite.findAll({
    where: {
      userId,
    },
  });

  const { count, rows } = await Recipe.findAndCountAll({
    offset,
    limit,
    where: {
      id: {
        [Op.in]: favorites.map(
          row => row.dataValues.recipeId
        ),
      },
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'photo'],
      },
    ],
  });

  const recipeIds = rows.map(row => row.get().id);

  const recipeRatingsRaw = await Rating.findAll({
    where: { recipeId: { [Op.in]: recipeIds } },
    attributes: [
      'recipeId',
      [fn('AVG', col('rating')), 'avgRating'],
    ],
    group: ['recipeId'],
  });

  const recipeRatings = recipeRatingsRaw.reduce(
    (acc, rating) => {
      acc[rating.get().recipeId] = rating.get().avgRating;
      return acc;
    },
    {} as Record<number, number | null>
  );

  const formattedRecipes = rows.map(row => {
    const recipe = row.get();
    return {
      ...recipe,
      avgRating: recipeRatings[recipe.id] || null,
      isFavorite: true,
    };
  });

  return {
    total: count,
    favoriteRecipes: formattedRecipes,
  };
};

const addFavoriteService = async (
  recipeId: number,
  userId: number
) => {
  const recipe = await Recipe.findOne({
    where: { id: recipeId },
  });

  if (!recipe) {
    throw new Error(Errors.recipeDoesntExist);
  }

  await Favorite.create({
    recipeId,
    userId,
  });

  await createNotification(
    recipe.get().userId,
    userId,
    NotificationContext.favorite
  );
};

const removeFromFavoriteService = async (
  recipeId: number,
  userId: number
) => {
  await Favorite.destroy({
    where: {
      recipeId,
      userId,
    },
  });
};

export {
  getFavoritesService,
  addFavoriteService,
  removeFromFavoriteService,
};
