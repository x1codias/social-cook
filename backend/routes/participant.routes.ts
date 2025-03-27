import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  editChatParticipant,
  deleteChatParticipant,
} from '../controllers/chat-participant.controller';

const participantRoutes = Router();

participantRoutes.put(
  '/:id',
  verifyToken,
  editChatParticipant
);
participantRoutes.delete(
  '/:id',
  verifyToken,
  deleteChatParticipant
);

export default participantRoutes;
