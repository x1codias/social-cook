import { Router } from 'express';
import {
  createRecipe,
  deleteRecipe,
  recipe,
  recipes,
  recipesFeed,
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
recipeRoutes.get('/feed', verifyToken, recipesFeed);
recipeRoutes.post(
  '/',
  verifyToken,
  upload.fields([
    { name: 'photos', maxCount: 6 },
    { name: 'preparationStepsPhotos', maxCount: 20 },
    { name: 'preparationVideo', maxCount: 1 },
  ]),
  createRecipe
);
recipeRoutes.delete('/{id}', verifyToken, deleteRecipe);
recipeRoutes.get('/:id', verifyToken, recipe);
recipeRoutes.get('/:id/comments', verifyToken, comments);
recipeRoutes.patch(
  '/:recipeId/comments/:commentId',
  verifyToken,
  editComment
);
recipeRoutes.delete(
  '/:recipeId/comments/:commentId',
  verifyToken,
  deleteComment
);
recipeRoutes.get(
  '/:id/ingredients',
  verifyToken,
  recipeIngredients
);
recipeRoutes.get(
  '/:id/preparations',
  verifyToken,
  recipePreparations
);
recipeRoutes.get('/:id/comments', verifyToken, comments);
recipeRoutes.post('/:id/comments', verifyToken, comments);
recipeRoutes.patch(
  '/:recipeId/comments/:commentId',
  verifyToken,
  editComment
);
recipeRoutes.delete(
  '/:recipeId/comments/:commentId',
  verifyToken,
  deleteComment
);

export default recipeRoutes;
