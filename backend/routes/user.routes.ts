import { Router } from 'express';
import { verifyToken } from '../controllers/auth.controller';
import { upload } from '../controllers/file.controller';
import {
  editUser,
  user,
  users,
} from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get(
  '?username={username}&offset={offset}&limit={limit}',
  verifyToken,
  users
);
userRoutes.get('/{id}', verifyToken, user);
userRoutes.patch(
  '/{username}',
  verifyToken,
  upload.single('photo'),
  editUser
);

export default userRoutes;
