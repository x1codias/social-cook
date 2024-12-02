import { existsSync, mkdirSync, renameSync } from 'fs';
import { Errors } from '../controllers/error.controller';
import Preperation from '../models/preperation.model';
import RecipeIngredient from '../models/recipe-ingedient.model';
import Recipe from '../models/recipe.model';
import User from '../models/user.model';
import { dirname } from 'path';
import { Op, Sequelize } from 'sequelize';
import Rating from '../models/rating.model';
import Ingredient from '../models/ingredient.model';
import Unit from '../models/unit.model';

const moveFile = (
  sourcePath: string,
  destinationPath: string
) => {
  const destinationDir = dirname(destinationPath);

  // Ensure the destination directory exists
  if (!existsSync(destinationDir)) {
    mkdirSync(destinationDir, { recursive: true });
  }

  // Move the file to the destination directory
  renameSync(sourcePath, destinationPath);
};

const getRecipesService = async (
  search: string,
  attributes: string[],
  offset?: number,
  limit?: number,
  includeUser?: boolean
) => {
  const whereClause = search?.length
    ? { title: { [Op.like]: `%${search}%` } }
    : {};

  const user = includeUser
    ? [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'photo'],
        },
      ]
    : [];

  const { count, rows } = await Recipe.findAndCountAll({
    offset: offset || 0,
    limit: limit || 10,
    where: whereClause,
    attributes: attributes,
    include: user,
  });

  // Fetch average ratings grouped by recipeId
  const recipeRatingsRaw = await Rating.findAll({
    where: {
      recipeId: {
        [Op.in]: rows.map(row => row.get().id), // Collect recipe IDs from the main query
      },
    },
    attributes: [
      'recipeId', // Group by recipeId
      [
        Sequelize.fn('AVG', Sequelize.col('rating')),
        'avgRating',
      ], // Calculate the average rating
    ],
    group: ['recipeId'],
  });

  // Convert recipe ratings into a dictionary for fast lookup
  const recipeRatings = recipeRatingsRaw.reduce(
    (acc, rating) => {
      acc[rating.get().recipeId] = rating.get().avgRating;

      return acc;
    },
    {} as Record<number, number | null>
  );

  // Attach avgRating to each recipe
  const recipes = rows.map(row => {
    const recipe = row.get();
    return {
      ...recipe,
      avgRating: recipeRatings[recipe.id] || null, // Default to null if no rating exists
    };
  });

  return {
    total: count,
    recipes,
  };
};

const getRecipeService = async (id: number) => {
  const recipe = await Recipe.findOne({
    where: { id },
    include: [
      { model: Preperation, as: 'preparation' },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'photo'],
      },
    ],
  });

  if (!recipe) {
    throw new Error(Errors.recipeDoesntExist);
  }

  const recipeIngredients = await RecipeIngredient.findAll({
    where: { recipeId: id },
    include: [
      { model: Ingredient, as: 'ingredient' },
      { model: Unit, as: 'unit' },
    ],
  });

  const formattedRecipe = {
    ...recipe.dataValues,
    ingredients: recipeIngredients.map(recipeIngredient =>
      recipeIngredient.get({ plain: true })
    ),
  };

  return {
    recipe: formattedRecipe,
  };
};

const createRecipeService = async (
  title: string,
  userId: number,
  preparationStepsDescription: string[],
  duration: any,
  ingredients: any,
  category: any,
  difficulty: any,
  description: any,
  servings: number,
  files: any
) => {
  if (!files || files.length === 0) {
    throw new Error(Errors.imageNotFound);
  }

  // Get photo file names
  const photoFileNames = (
    files.photos as Express.Multer.File[]
  ).map(file => file.filename);

  const parsedDuration = {
    hours: parseInt(JSON.parse(duration).hours),
    minutes: parseInt(JSON.parse(duration).minutes),
  };
  const parsedIngredients = JSON.parse(ingredients);

  // Create or find the recipe
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
      servings,
      photos: photoFileNames, // Store the filenames for photos
    },
  });

  if (!created) {
    throw new Error(Errors.recipeExists); // Recipe already exists
  }

  // Step 2: Create recipe folder based on the recipe ID
  const recipeFolder = `public/uploads/recipes/${recipe.get(
    'id'
  )}`;
  if (!existsSync(recipeFolder)) {
    mkdirSync(recipeFolder, { recursive: true });
  }

  const photosFolder = `${recipeFolder}/photos`;
  if (!existsSync(photosFolder)) {
    mkdirSync(photosFolder, { recursive: true });
  }

  // Move each photo from the temporary location to the new folder
  const movedPhotoFileNames = [];
  files.photos.forEach((file: Express.Multer.File) => {
    const tempPath = file.path;
    const newFilePath = `${photosFolder}/${file.filename}`;

    // Move the file from temp to the new folder
    moveFile(tempPath, newFilePath);

    // Push the new file name to the list
    movedPhotoFileNames.push(file.filename);
  });

  // After moving the photos, update the recipe's photos field with the new file names
  await recipe.update({ photos: movedPhotoFileNames });

  // Step 3: Prepare folder for preparation video and steps
  const preparationFolder = `${recipeFolder}/preparation`;
  const preparationStepsFolder = `${preparationFolder}/steps`;

  // Ensure the preparation folder exists
  if (!existsSync(preparationFolder)) {
    mkdirSync(preparationFolder, { recursive: true });
  }

  // Ensure the preparation steps folder exists
  if (!existsSync(preparationStepsFolder)) {
    mkdirSync(preparationStepsFolder, { recursive: true });
  }

  let preparationRecipe;
  let ingredientsRecipe;

  // Handle preparation video
  let preparationVideoFileName = '';
  if (files.preparationVideo) {
    const videoFile = files.preparationVideo[0];
    const videoFileName = `${recipe.get('id')}_prep_video.${
      videoFile.mimetype.split('/')[1]
    }`;
    preparationVideoFileName = videoFileName;

    // Move the video file to the preparation folder
    moveFile(
      videoFile.path,
      `${preparationFolder}/${videoFileName}`
    );
  }

  // Handle preparation step photos
  const preparationStepFileNames = [];
  if (files.preparationStepsPhotos) {
    files.preparationStepsPhotos.forEach(
      (file: Express.Multer.File, index: number) => {
        const stepFileName = `${recipe.get('id')}_step_${
          index + 1
        }.${file.mimetype.split('/')[1]}`;
        preparationStepFileNames.push(stepFileName);

        // Move each step photo to the steps folder
        moveFile(
          file.path,
          `${preparationStepsFolder}/${stepFileName}`
        );
      }
    );
  }

  // If preparation has steps or video, create preparation entry
  if (
    files.preparationVideo ||
    (preparationStepsDescription &&
      preparationStepsDescription.length)
  ) {
    preparationRecipe = await Preperation.create({
      recipeId: recipe.get().id,
      steps: preparationStepsDescription.map(
        (description, index) => ({
          description,
          photo: files.preparationStepsPhotos[index],
        })
      ),
      prepVideo: preparationVideoFileName,
    });
  }

  // If there are ingredients, create RecipeIngredient entries
  if (parsedIngredients && parsedIngredients.length) {
    const recipeIngredients = parsedIngredients.map(
      (ingredient: any) => {
        return {
          recipeId: recipe.get().id,
          ingredientId: ingredient.name,
          quantity: ingredient.quantity,
          unitId: ingredient.unit,
        };
      }
    );

    ingredientsRecipe = await RecipeIngredient.bulkCreate(
      recipeIngredients
    );
  }

  // Step 4: Return the newly created recipe with preparation and ingredients data
  return {
    recipe: {
      ...recipe.get({ plain: true }),
      preparation: preparationRecipe,
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
