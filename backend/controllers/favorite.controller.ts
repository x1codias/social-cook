import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  addFavoriteService,
  getFavoritesService,
  removeFromFavoriteService,
} from '../services/favorite.services';

const favorites = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { offset, limit } = req.body;
    const { userId } = req.user;

    const { total, favoriteRecipes } =
      await getFavoritesService(userId, offset, limit);

    res.status(200).json({
      total,
      favoriteRecipes,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const addFavorite = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;

    await addFavoriteService(parseInt(recipeId), userId);

    res.status(200).json({
      message: 'addedToFavorites',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const removeFromFavorites = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;

    await removeFromFavoriteService(
      parseInt(recipeId),
      userId
    );

    res.status(200).json({
      message: 'removedFromFavorites',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { favorites, addFavorite, removeFromFavorites };
