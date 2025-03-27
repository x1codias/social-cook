import ChatParticipant, {
  ChatParticipantRole,
} from '../models/chat/chat-participant.model';
import { Op } from 'sequelize';
import { Errors } from '../controllers/error.controller';

const createChatParticipantService = async (
  chatRoomId: number,
  userId: number,
  participantId: number
) => {
  const user = await ChatParticipant.findOne({
    where: {
      chatRoomId,
      userId,
    },
  });

  if (!user) throw new Error(Errors.userNotFound);

  if (user.get().role === ChatParticipantRole.member)
    throw new Error(Errors.noPermission);

  const newChatParticipant = await ChatParticipant.create({
    chatRoomId,
    userId: participantId,
    role: ChatParticipantRole.member,
  });

  return {
    newChatParticipant,
  };
};

const editChatParticipantService = async (
  chatRoomId: number,
  participantId: number,
  role: ChatParticipantRole
) => {
  const chatParticipant = await ChatParticipant.findOne({
    where: {
      chatRoomId,
      userId: participantId,
    },
  });

  if (!chatParticipant) {
    throw new Error(Errors.notFound);
  }

  await chatParticipant.update({
    role,
  });
};

const deleteChatParticipantService = async (
  chatRoomId: number,
  participantIds: number[]
) => {
  await ChatParticipant.destroy({
    where: {
      chatRoomId,
      userId: {
        [Op.in]: participantIds,
      },
    },
  });
};

export {
  createChatParticipantService,
  editChatParticipantService,
  deleteChatParticipantService,
};
