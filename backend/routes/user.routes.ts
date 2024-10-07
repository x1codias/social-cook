import { Router } from 'express';
import { verifyToken } from '../controllers/auth.controller';
import { upload } from '../controllers/file.controller';
import {
  editUser,
  user,
  users,
} from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', verifyToken, users);
userRoutes.get('/{id}', verifyToken, user);
userRoutes.patch(
  '/{id}',
  verifyToken,
  upload.single('photo'),
  editUser
);

export default userRoutes;
