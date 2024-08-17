import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
} from '../controllers/recipe.controller';
import { verifyToken } from '../controllers/auth.controller';

const recipeRoutes = Router();

recipeRoutes.get('/recipes', verifyToken, recipes);
recipeRoutes.post('/recipes', verifyToken, createRecipe);
recipeRoutes.delete(
  '/recipes/{id}',
  verifyToken,
  deleteRecipe
);
recipeRoutes.get('/recipes/{id}', verifyToken, recipe);

export default recipeRoutes;
