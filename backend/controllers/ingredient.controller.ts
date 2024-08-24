import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import Ingredient from '../models/ingredient.model';

const ingredients = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, rows } =
      await Ingredient.findAndCountAll({
        offset,
        limit,
      });

    res.status(200).json({
      total: count,
      ingredients: rows.map(row => row.dataValues),
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const createIngredient = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body as { name: string };

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
      return errorHandler(
        409,
        Errors.ingredientExists,
        res
      );
    }

    res.status(200).json({
      message: 'recipeCreated',
      ingredient: newIngredient,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { ingredients, createIngredient };
