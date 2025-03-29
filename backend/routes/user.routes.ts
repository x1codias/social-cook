import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import { upload } from '../middlwares/file.middleware';
import {
  editUser,
  user,
  userRecipes,
  users,
  usersFeed,
} from '../controllers/user.controller';
import {
  addFavorite,
  favorites,
  removeFromFavorites,
} from '../controllers/favorite.controller';
import {
  block,
  unblock,
} from '../controllers/blockage.controller';
import {
  follow,
  unfollow,
} from '../controllers/followage.controller';

const userRoutes = Router();

userRoutes.get('/', verifyToken, users);
userRoutes.get('/feed', verifyToken, usersFeed);
userRoutes.get('/:id', verifyToken, user);
userRoutes.patch(
  '/:id',
  verifyToken,
  upload.single('photo'),
  editUser
);
userRoutes.get('/:id/favorites', verifyToken, favorites);
userRoutes.get('/:id/recipes', verifyToken, userRecipes);
userRoutes.post('/:id/follow', verifyToken, follow);
userRoutes.post('/:id/unfollow', verifyToken, unfollow);
userRoutes.post('/:id/block', verifyToken, block);
userRoutes.post('/:id/unblock', verifyToken, unblock);

export default userRoutes;
