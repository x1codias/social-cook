import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
} from '../controllers/recipe.controller';
import { verifyToken } from '../middlwares/verify-token.middleware';
import { upload } from '../middlwares/file.middleware';
import {
  comments,
  deleteComment,
  editComment,
} from '../controllers/comment.controller';
import { recipeIngredients } from '../controllers/ingredient.controller';
import { recipePreparations } from '../controllers/preparation.controller';

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
recipeRoutes.get(
  '/{recipeId}/comments',
  verifyToken,
  comments
);
recipeRoutes.patch(
  '/{recipeId}/comments/{commentId}',
  verifyToken,
  editComment
);
recipeRoutes.delete(
  '/{recipeId}/comments/{commentId}',
  verifyToken,
  deleteComment
);
recipeRoutes.get(
  '/{recipeId}/ingredients',
  verifyToken,
  recipeIngredients
);
recipeRoutes.get(
  '/{recipeId}/preparations',
  verifyToken,
  recipePreparations
);
recipeRoutes.get(
  '/{recipeId}/comments',
  verifyToken,
  comments
);
recipeRoutes.post(
  '/{recipeId}/comments',
  verifyToken,
  comments
);
recipeRoutes.patch(
  '/{recipeId}/comments/{commentId}',
  verifyToken,
  editComment
);
recipeRoutes.delete(
  '/{recipeId}/comments/{commentId}',
  verifyToken,
  deleteComment
);

export default recipeRoutes;
