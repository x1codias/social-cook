import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  deleteComment,
  editComment,
} from '../controllers/comment.controller';

const commentRoutes = Router();

commentRoutes.patch(
  '/{commentId}',
  verifyToken,
  editComment
);
commentRoutes.delete(
  '/{commentId}',
  verifyToken,
  deleteComment
);

export default commentRoutes;
