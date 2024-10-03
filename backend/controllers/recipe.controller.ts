import Recipe from '../models/recipe.model';
import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import Preperation from '../models/preperation.model';
import RecipeIngredient from '../models/recipe-ingedient.model';

const recipes = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, rows } = await Recipe.findAndCountAll({
      offset,
      limit,
    });

    res.status(200).json({
      total: count,
      recipes: rows.map(row => row.dataValues),
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
      recipe: recipe.dataValues,
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
      userId,
      title,
      duration,
      category,
      difficulty,
      description,
      ingredients,
      preparation,
    } = req.body;

    if (!req.files) {
      return errorHandler(400, Errors.imageNotFound, res);
    }

    console.log(req.files);

    const photoFileNames = (
      req.files as Express.Multer.File[]
    ).map(file => file.filename);

    const parsedPreparation = JSON.parse(preparation);
    const parsedDuration = {
      hours: parseInt(JSON.parse(duration).hours),
      minutes: parseInt(JSON.parse(duration).minutes),
    };
    const parsedIngredients = JSON.parse(ingredients);

    console.log(parsedDuration);

    const [recipe, created] = await Recipe.findOrCreate({
      where: {
        title,
        userId,
      },
      defaults: {
        title,
        duration: parsedDuration,
        category,
        difficulty,
        description,
        userId: parseInt(userId),
        photos: photoFileNames,
      },
    });

    if (!created) {
      return errorHandler(409, Errors.recipeExists, res);
    }

    let preparationRecipe;
    let ingredientsRecipe;

    if (
      parsedPreparation &&
      (parsedPreparation.steps.length ||
        parsedPreparation.video.trim().length)
    ) {
      preparationRecipe = await Preperation.create({
        recipeId: recipe.get().id,
        steps: parsedPreparation.steps.map(
          step => step.description
        ),
        prepVideo: parsedPreparation.video,
      });
    }

    if (parsedIngredients && parsedIngredients.length) {
      const recipeIngredients = ingredients.map(
        (ingredient: string) => {
          const parsedIngredient = JSON.parse(ingredient);

          return {
            recipeId: recipe.get().id,
            ingredientId: parsedIngredient.name,
            quantity: parsedIngredient.quantity,
            unitId: parsedIngredient.unit,
          };
        }
      );

      ingredientsRecipe = await RecipeIngredient.bulkCreate(
        recipeIngredients
      );
    }

    res.status(200).json({
      message: 'recipeCreated',
      recipe: {
        ...recipe.get({ plain: true }),
        preparation:
          parsedPreparation &&
          (parsedPreparation.steps.length ||
            parsedPreparation.video.trim().length)
            ? {
                video: preparationRecipe.get().prepVideo,
                steps: preparationRecipe
                  .get()
                  .steps.map((step: string) => ({
                    photo: '',
                    description: step,
                  })),
              }
            : {},
        ingredients:
          parsedIngredients && parsedIngredients.length
            ? ingredientsRecipe
            : [],
      },
    });
  } catch (error) {
    console.log(error);
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
