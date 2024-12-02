import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  chatRoomMessages,
  chatRoomParticipants,
  chatRooms,
  deleteChatRoom,
  editChatRoom,
} from '../controllers/chat-room.controller';

const chatRoomRoutes = Router();

chatRoomRoutes.get('/', verifyToken, chatRooms);
chatRoomRoutes.put('/:id', verifyToken, editChatRoom);
chatRoomRoutes.delete('/:id', verifyToken, deleteChatRoom);
chatRoomRoutes.get(
  '/:id/messages',
  verifyToken,
  chatRoomMessages
);
chatRoomRoutes.get(
  '/:id/participants',
  verifyToken,
  chatRoomParticipants
);

export default chatRoomRoutes;
