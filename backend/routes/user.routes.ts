import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import { upload } from '../middlwares/file.middleware';
import {
  editUser,
  user,
  userRecipes,
  users,
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
userRoutes.get('/{id}', verifyToken, user);
userRoutes.patch(
  '/{id}',
  verifyToken,
  upload.single('photo'),
  editUser
);
userRoutes.get(
  '/{userId}/favorites',
  verifyToken,
  favorites
);
userRoutes.post(
  '/{userId}/favorites',
  verifyToken,
  addFavorite
);
userRoutes.delete(
  '/{userId}/favorites/{favoriteId}',
  verifyToken,
  removeFromFavorites
);
userRoutes.get(
  '/{userId}/recipes',
  verifyToken,
  userRecipes
);
userRoutes.post('/{userId}/follow', verifyToken, follow);
userRoutes.post(
  '/{userId}/unfollow',
  verifyToken,
  unfollow
);
userRoutes.post('/{userId}/block', verifyToken, block);
userRoutes.post('/{userId}/unblock', verifyToken, unblock);

export default userRoutes;
