import { Errors } from '../controllers/error.controller';
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

const createIngredientService = async (name: string) => {
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
    throw new Error(Errors.ingredientExists);
  }

  return { newIngredient };
};

export { getIngredientsService, createIngredientService };
