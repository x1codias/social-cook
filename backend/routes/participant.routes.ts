import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  editChatParticipant,
  deleteChatParticipant,
} from '../controllers/chat-participant.controller';

const participantRoutes = Router();

participantRoutes.put(
  '/{participantId}',
  verifyToken,
  editChatParticipant
);
participantRoutes.delete(
  '/{participantId}',
  verifyToken,
  deleteChatParticipant
);

export default participantRoutes;
