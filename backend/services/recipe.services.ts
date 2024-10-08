import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import Preperation from '../models/preperation.model';
import RecipeIngredient from '../models/recipe-ingedient.model';
import Recipe from '../models/recipe.model';

const getRecipesService = async (
  offset: number,
  limit: number
) => {
  const { count, rows } = await Recipe.findAndCountAll({
    offset,
    limit,
  });

  return {
    total: count,
    recipes: rows.map(row => row.dataValues),
  };
};

const getRecipeService = async (id: number) => {
  const recipe = await Recipe.findOne({ where: { id } });

  return {
    recipe: recipe.dataValues,
  };
};

const createRecipeService = async (
  title: string,
  userId: number,
  preparation: any,
  duration: any,
  ingredients: any,
  category: any,
  difficulty: any,
  description: any,
  photoFileNames: any,
  res: Response
) => {
  const parsedPreparation = JSON.parse(preparation);
  const parsedDuration = {
    hours: parseInt(JSON.parse(duration).hours),
    minutes: parseInt(JSON.parse(duration).minutes),
  };
  const parsedIngredients = JSON.parse(ingredients);

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
      userId,
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

  return {
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
  };
};

const editRecipesService = async () => {};

const deleteRecipesService = async (id: number) => {
  await Recipe.destroy({ where: { id } });
};

export {
  getRecipesService,
  getRecipeService,
  createRecipeService,
  editRecipesService,
  deleteRecipesService,
};
