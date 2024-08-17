import Recipe from '../models/recipe.model';
import { Response, Request, NextFunction } from 'express';
import { Errors, errorHandler } from './error.controller';

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

const recipe = async (req: Request, res: Response) => {};

const createRecipe = async (
  req: Request,
  res: Response
) => {};

const deleteRecipe = async (
  req: Request,
  res: Response
) => {};

const updateRecipe = async (
  req: Request,
  res: Response
) => {};

export {
  recipes,
  recipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
