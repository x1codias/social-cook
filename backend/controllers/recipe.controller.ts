import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
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
    errorHandler(500, Errors.serverError, res);
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
    errorHandler(500, Errors.serverError, res);
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

    if (!req.files) {
      return errorHandler(400, Errors.imageNotFound, res);
    }

    const photoFileNames = (
      req.files as Express.Multer.File[]
    ).map(file => file.filename);

    const { recipe } = await createRecipeService(
      title,
      userId,
      preparation,
      duration,
      ingredients,
      category,
      difficulty,
      description,
      photoFileNames,
      res
    );

    res.status(200).json({
      message: 'recipeCreated',
      recipe,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
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
    errorHandler(500, Errors.serverError, res);
  }
};

export { recipes, recipe, createRecipe, deleteRecipe };
