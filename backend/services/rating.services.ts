import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { NotificationContext } from '../models/notification.model';
import Rating from '../models/rating.model';
import Recipe from '../models/recipe.model';
import { createNotification } from './notification.service';

const rateEditRecipeService = async (
  userId: number,
  recipeId: number,
  rating: number,
  res: Response
) => {
  const [newRating, created] = await Rating.findOrCreate({
    where: {
      userId,
      recipeId: recipeId,
    },
    defaults: {
      userId,
      recipeId: recipeId,
      rating,
    },
  });

  if (created) {
    await newRating.update({
      rating,
    });

    await newRating.save();

    return { created };
  }

  const recipe = await Recipe.findOne({
    where: { id: recipeId },
  });

  if (!recipe) {
    return errorHandler(404, Errors.recipeDoesntExist, res);
  }

  await createNotification(
    recipe.get().userId,
    userId,
    NotificationContext.rating,
    rating
  );
};

const undoRatingService = async (
  userId: number,
  recipeId: number
) => {
  await Rating.destroy({
    where: {
      userId,
      recipeId: recipeId,
    },
  });
};

export { rateEditRecipeService, undoRatingService };
