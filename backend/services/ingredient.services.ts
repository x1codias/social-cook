import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import Ingredient from '../models/ingredient.model';

const getIngredientsService = async (
  offset: number,
  limit: number
) => {
  const { count, rows } = await Ingredient.findAndCountAll({
    offset,
    limit,
  });

  return {
    total: count,
    ingredients: rows.map(row => row.dataValues),
  };
};

const createIngredientService = async (
  name: string,
  res: Response
) => {
  const [newIngredient, created] =
    await Ingredient.findOrCreate({
      where: {
        name: name.toLowerCase(),
      },
      defaults: {
        name: name.toLowerCase(),
      },
    });

  if (!created) {
    return errorHandler(409, Errors.ingredientExists, res);
  }

  return { newIngredient };
};

export { getIngredientsService, createIngredientService };
