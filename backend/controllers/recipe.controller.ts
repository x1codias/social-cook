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
    const limit = parseInt(req.query.limit as string) || 10;
    const offset =
      parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string;

    console.log(req.query, req.body);

    const { total, recipes } = await getRecipesService(
      offset,
      limit,
      search
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
      preparationStepsDescription,
      servings,
    } = req.body;
    const { userId } = req.user;

    await createRecipeService(
      title,
      userId,
      preparationStepsDescription,
      duration,
      ingredients,
      category,
      difficulty,
      description,
      parseInt(servings),
      req.files
    );

    res.status(200).json({
      message: 'recipeCreated',
    });
  } catch (error) {
    console.log(error);
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
