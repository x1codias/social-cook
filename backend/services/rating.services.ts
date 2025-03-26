import { col, fn } from 'sequelize';
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
  // Find or create a rating entry
  const [ratingEntry, created] = await Rating.findOrCreate({
    where: { userId, recipeId },
    defaults: { userId, recipeId, rating },
  });

  // If rating already exists, update it
  if (!created) {
    await ratingEntry.update({ rating });
  }

  // Get the recipe to notify its owner
  const recipe = await Recipe.findOne({
    where: { id: recipeId },
  });
  if (!recipe) {
    throw new Error(Errors.recipeDoesntExist);
  }

  // Notify the recipe owner (only if rating was updated)
  if (!created || ratingEntry.get().rating !== rating) {
    await createNotification(
      recipe.get().userId,
      userId,
      NotificationContext.rating,
      rating
    );
  }

  // Fetch the updated average rating for the recipe (this is what you were asking)
  const avgRatingResult = await Rating.findOne({
    where: { recipeId },
    attributes: [
      [fn('AVG', col('rating')), 'avgRating'], // Calculate the average rating
    ],
  });

  const avgRating = avgRatingResult
    ? avgRatingResult.get().avgRating
    : null;

  // Return the response with the avgRating included
  return { created, avgRating };
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
