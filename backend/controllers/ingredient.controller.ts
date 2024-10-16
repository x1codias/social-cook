import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  createIngredientService,
  getIngredientsService,
} from '../services/ingredient.services';

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
    errorHandler(500, Errors.serverError, res);
  }
};

const createIngredient = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name } = req.body as { name: string };

    const { newIngredient } = createIngredientService(
      name,
      res
    );

    res.status(200).json({
      message: 'recipeCreated',
      ingredient: newIngredient,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { ingredients, createIngredient };
