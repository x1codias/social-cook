import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  deleteMessage,
  editMessage,
} from '../controllers/message.controller';

const messageRoutes = Router();

messageRoutes.put('/:id', verifyToken, editMessage);
messageRoutes.delete('/:id', verifyToken, deleteMessage);

export default messageRoutes;
