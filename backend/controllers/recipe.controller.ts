import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  createRecipeService,
  deleteRecipesService,
  getRecipeService,
  getRecipesService,
} from '../services/recipe.services';

const recipes = async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { total, recipes } = await getRecipesService(
      offset,
      limit
    );

    res.status(200).json({
      total,
      recipes,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const recipe = async (req: AuthRequest, res: Response) => {
  try {
    const { recipeId } = req.params;

    const { recipe } = await getRecipeService(
      parseInt(recipeId)
    );

    res.status(200).json({
      recipe,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const createRecipe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      title,
      duration,
      category,
      difficulty,
      description,
      ingredients,
      preparation,
    } = req.body;
    const { userId } = req.user;

    const { recipe } = await createRecipeService(
      title,
      userId,
      preparation,
      duration,
      ingredients,
      category,
      difficulty,
      description,
      req.files
    );

    res.status(200).json({
      message: 'recipeCreated',
      recipe,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const deleteRecipe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { recipeId } = req.params;

    await deleteRecipesService(parseInt(recipeId));

    res.status(200).json({
      message: 'recipeDeleted',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { recipes, recipe, createRecipe, deleteRecipe };
