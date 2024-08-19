import { Router } from 'express';
import {
  googleAuthentication,
  login,
  logout,
  register,
  verifyToken,
} from '../controllers/auth.controller';
import { upload } from '../controllers/file.controller';

const authRoutes = Router();

authRoutes.post(
  '/register',
  upload.single('photo'),
  register
);
authRoutes.post('/logout', verifyToken, logout);
authRoutes.post('/login', login);
authRoutes.post('/loginGoogle', googleAuthentication);

export default authRoutes;
