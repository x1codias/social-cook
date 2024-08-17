import Recipe from '../models/recipe.model';
import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import RecipeIngredient from '../models/recipe-ingedient.model';

const recipes = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.body;
    const { count, rows } = await Recipe.findAndCountAll({
      offset,
      limit,
    });

    res.status(200).json({
      total: count,
      recipes: rows,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const recipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ where: { id } });

    res.status(200).json({
      recipe,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const createRecipe = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      ingredients,
      preperation,
      category,
      userId,
    } = req.body;

    const [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        title,
        userId,
      },
      defaults: {
        title,
        preperation,
        category,
        userId,
      },
    });

    if (!created) {
      return errorHandler(409, Errors.recipeExists, res);
    }

    if (ingredients && ingredients.length) {
      const recipeIngredients = ingredients.map(
        (ingredient: {
          id: number;
          quantity: number;
          unitId: number;
        }) => ({
          recipeId: newRecipe.get().id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
          unitId: ingredient.unitId,
        })
      );

      await RecipeIngredient.bulkCreate(recipeIngredients);
    }

    res.status(200).json({
      message: 'recipeCreated',
      recipe: newRecipe,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const deleteRecipe = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await Recipe.destroy({ where: { id } });
    await RecipeIngredient.destroy({
      where: { recipeId: id },
    });

    res.status(200).json({
      message: 'recipeDeleted',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { recipes, recipe, createRecipe, deleteRecipe };
