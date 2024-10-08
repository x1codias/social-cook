import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import { upload } from '../middlwares/file.middleware';
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
