import Recipe from '../models/recipe.model';
import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import RecipeIngredient from '../models/recipe-ingedient.model';
import Preperation from '../models/preperation.model';

const recipes = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset =
      parseInt(req.query.offset as string) || 10;
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
      description,
      category,
      userId,
    } = req.body;

    const files = req.files as Express.Multer.File[];
    const photoFileNames = files.map(file => file.filename);

    const [newRecipe, created] = await Recipe.findOrCreate({
      where: {
        title,
        userId,
      },
      defaults: {
        title,
        category,
        description,
        userId,
        photos: photoFileNames,
      },
    });

    if (!created) {
      return errorHandler(409, Errors.recipeExists, res);
    }

    if (preperation) {
      await Preperation.create({
        recipeId: newRecipe.dataValues.id,
        steps: preperation.steps,
        prepVideo: preperation.video,
      });
    }

    if (ingredients && ingredients.length) {
      const recipeIngredients = ingredients.map(
        (ingredient: {
          id: number;
          quantity: number;
          unitId: number;
        }) => ({
          recipeId: newRecipe.dataValues.id,
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
          unitId: ingredient.unitId,
        })
      );

      await RecipeIngredient.bulkCreate(recipeIngredients);
    }

    res.status(200).json({
      message: 'recipeCreated',
      recipe: newRecipe.dataValues,
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

    res.status(200).json({
      message: 'recipeDeleted',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { recipes, recipe, createRecipe, deleteRecipe };
