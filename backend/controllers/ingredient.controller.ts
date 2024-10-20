import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  createIngredientService,
  getIngredientsService,
  getRecipeIngredientsService,
} from '../services/ingredient.services';

const recipeIngredients = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { recipeId } = req.params;

    const { ingredients } =
      await getRecipeIngredientsService(parseInt(recipeId));

    res.status(200).json({
      ingredients,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const ingredients = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { total, ingredients } =
      await getIngredientsService(offset, limit);

    res.status(200).json({
      total,
      ingredients,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const createIngredient = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name } = req.body as { name: string };

    const { newIngredient } = await createIngredientService(
      name
    );

    res.status(200).json({
      message: 'recipeCreated',
      ingredient: newIngredient,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { recipeIngredients, ingredients, createIngredient };
