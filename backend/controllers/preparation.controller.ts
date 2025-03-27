import { AuthRequest } from './auth.controller';
import { Response } from 'express';
import { errorHandler } from './error.controller';
import { getRecipePreparationsService } from '../services/preparation.services';

const recipePreparations = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { recipeId } = req.params;

    const { preparations } =
      await getRecipePreparationsService(
        parseInt(recipeId)
      );

    res.status(200).json({
      preparations,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { recipePreparations };
