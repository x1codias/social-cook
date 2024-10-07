import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
} from '../controllers/recipe.controller';
import { verifyToken } from '../controllers/auth.controller';
import { upload } from '../controllers/file.controller';

const recipeRoutes = Router();

recipeRoutes.get('/', verifyToken, recipes);
recipeRoutes.post(
  '/',
  verifyToken,
  upload.array('images'),
  createRecipe
);
recipeRoutes.delete('/{id}', verifyToken, deleteRecipe);
recipeRoutes.get('/{id}', verifyToken, recipe);

export default recipeRoutes;
