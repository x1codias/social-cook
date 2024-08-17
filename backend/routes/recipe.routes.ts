import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
  updateRecipe,
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
recipeRoutes.patch(
  '/recipes/{id}',
  verifyToken,
  updateRecipe
);

export default recipeRoutes;
