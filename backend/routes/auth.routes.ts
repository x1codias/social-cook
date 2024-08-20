import { Router } from 'express';
import {
  facebookAuthentication,
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
authRoutes.post('/authGoogle', googleAuthentication);
authRoutes.post('/authFacebook', facebookAuthentication);

export default authRoutes;
