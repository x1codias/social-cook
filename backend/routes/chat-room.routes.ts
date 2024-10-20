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
chatRoomRoutes.put(
  '/{chatRoomId}',
  verifyToken,
  editChatRoom
);
chatRoomRoutes.delete(
  '/{chatRoomId}',
  verifyToken,
  deleteChatRoom
);
chatRoomRoutes.get(
  '/{chatRoomId}/messages',
  verifyToken,
  chatRoomMessages
);
chatRoomRoutes.get(
  '/{chatRoomId}/participants',
  verifyToken,
  chatRoomParticipants
);

export default chatRoomRoutes;
