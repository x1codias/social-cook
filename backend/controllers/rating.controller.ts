import { Response } from 'express';
import { AuthRequest } from './auth.controller';
import { errorHandler, Errors } from './error.controller';
import Rating from '../models/rating.model';

const rateEditRecipe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { recipeId } = req.params;
    const { rating } = req.body;

    const [newRating, created] = await Rating.findOrCreate({
      where: {
        userId,
        recipeId: parseInt(recipeId),
      },
      defaults: {
        userId,
        recipeId: parseInt(recipeId),
        rating,
      },
    });

    if (created) {
      await newRating.update({
        rating,
      });

      await newRating.save();
    }

    res.status(200).json({
      message: created ? 'newRating' : 'editedRating',
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

    await Rating.destroy({
      where: {
        userId,
        recipeId: parseInt(recipeId),
      },
    });

    res.status(200).json({
      message: 'ratingUndone',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { rateEditRecipe, undoRating };
