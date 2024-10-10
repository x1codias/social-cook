import { Errors } from '../controllers/error.controller';
import { NotificationContext } from '../models/notification.model';
import Rating from '../models/rating.model';
import Recipe from '../models/recipe.model';
import { createNotification } from './notification.service';

const rateEditRecipeService = async (
  userId: number,
  recipeId: number,
  rating: number
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
    throw new Error(Errors.recipeDoesntExist);
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
