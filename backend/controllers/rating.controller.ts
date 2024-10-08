import { Response } from 'express';
import { AuthRequest } from './auth.controller';
import { errorHandler, Errors } from './error.controller';
import {
  rateEditRecipeService,
  undoRatingService,
} from '../services/rating.services';

const rateEditRecipe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;
    const { rating } = req.body;

    await rateEditRecipeService(
      userId,
      parseInt(recipeId),
      rating,
      res
    );

    res.status(200).json({
      message: 'newRating',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const undoRating = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;

    await undoRatingService(userId, parseInt(recipeId));

    res.status(200).json({
      message: 'ratingUndone',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { rateEditRecipe, undoRating };
