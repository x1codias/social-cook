import { Router } from 'express';
import {
  login,
  logout,
  register,
  verifyToken,
} from '../controllers/auth.controller';
import { upload } from '../controllers/upload.controller';

const authRoutes = Router();

authRoutes.post(
  '/register',
  upload.single('photo'),
  register
);
authRoutes.post('/logout', verifyToken, logout);
authRoutes.post('/login', login);

export default authRoutes;
