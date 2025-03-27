import { Errors } from '../controllers/error.controller';
import ChatParticipant from '../models/chat/chat-participant.model';
import Message from '../models/chat/message.model';

const createMessageService = async (
  userId: number,
  chatRoomId: number,
  content: string
) => {
  const participant = await ChatParticipant.findOne({
    where: {
      userId,
      chatRoomId,
    },
  });

  if (!participant) throw new Error(Errors.notFound);

  const message = await Message.create({
    participantId: participant.get().id as number,
    chatRoomId,
    content,
  });

  return { message: message.get() };
};

const editMessageService = async (
  messageId: number,
  content: string
) => {
  const messageToEdit = await Message.findByPk(messageId);

  if (!messageToEdit) throw new Error(Errors.notFound);

  await messageToEdit.update({
    content,
  });
};

const deleteMessageService = async (messageId: number) => {
  await Message.destroy({
    where: {
      id: messageId,
    },
  });
};

export {
  createMessageService,
  editMessageService,
  deleteMessageService,
};
