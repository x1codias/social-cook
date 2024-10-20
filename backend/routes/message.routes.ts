import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  deleteMessage,
  editMessage,
} from '../controllers/message.controller';

const messageRoutes = Router();

messageRoutes.put('/{messageId}', verifyToken, editMessage);
messageRoutes.delete(
  '/{messageId}',
  verifyToken,
  deleteMessage
);

export default messageRoutes;
