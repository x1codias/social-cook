import { Op } from 'sequelize';
import Favorite from '../models/favorite.model';
import Recipe from '../models/recipe.model';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { createNotification } from './notification.service';
import { NotificationContext } from '../models/notification.model';
import { Response } from 'express';

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
  });

  return {
    total: count,
    favoriteRecipes: rows.map(row => row.dataValues),
  };
};

const addFavoriteService = async (
  recipeId: number,
  userId: number,
  res: Response
) => {
  const recipe = await Recipe.findOne({
    where: { id: recipeId },
  });

  if (!recipe) {
    return errorHandler(404, Errors.recipeDoesntExist, res);
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
