import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import Favorite from '../models/favorite.model';
import { Op } from 'sequelize';
import Recipe from '../models/recipe.model';
import { AuthRequest } from './auth.controller';
import { createNotification } from '../services/notification.service';
import { NotificationContext } from '../models/notification.model';

const favorites = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { offset, limit } = req.body;
    const { userId } = req.user;

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

    res.status(200).json({
      total: count,
      favoriteRcipes: rows.map(row => row.dataValues),
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const addFavorite = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { recipeId } = req.body;
    const { userId } = req.user;

    const recipe = await Recipe.findOne({
      where: { id: recipeId },
    });

    if (!recipe) {
      return errorHandler(
        404,
        Errors.recipeDoesntExist,
        res
      );
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

    res.status(200).json({
      message: 'addedToFavorites',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const removeFromFavorites = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.body;

    await Favorite.destroy({
      where: {
        recipeId,
        userId,
      },
    });

    res.status(200).json({
      message: 'removedFromFavorites',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { favorites, addFavorite, removeFromFavorites };
