import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  deleteComment,
  editComment,
} from '../controllers/comment.controller';

const commentRoutes = Router();

commentRoutes.patch('/:id', verifyToken, editComment);
commentRoutes.delete('/:id', verifyToken, deleteComment);

export default commentRoutes;
