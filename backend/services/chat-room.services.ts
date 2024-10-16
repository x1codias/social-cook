import ChatParticipant, {
  ChatParticipantRole,
  ChatParticipantType,
} from '../models/chat/chat-participant.model';
import ChatRoom, {
  ChatRoomContext,
} from '../models/chat/chat-room.model';
import { Op } from 'sequelize';
import User from '../models/user.model';
import Message from '../models/chat/message.model';
import sequelize from '../sequelize';
import { Errors } from '../controllers/error.controller';

const getChatRoomsService = async (
  limit: number,
  offset: number,
  userId: number
) => {
  const { count, rows } =
    await ChatParticipant.findAndCountAll({
      limit,
      offset,
      where: {
        userId,
      },
    });

  const chatRooms = await ChatRoom.findAll({
    where: {
      id: {
        [Op.in]: rows.map(row => row.get().chatRoomId),
      },
    },
    include: [
      {
        model: ChatParticipant,
        as: 'participants',
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'photo'], // Fetch user details for participants
          },
        ],
      },
    ],
  });

  return {
    count,
    chatRooms,
  };
};

const getChatRoomMessagesService = async (
  chatRoomId: number,
  limit: number,
  offset: number
) => {
  const { count, rows } = await Message.findAndCountAll({
    where: { chatRoomId },
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'photo'],
      },
    ],
  });

  return {
    count,
    messages: rows.map(message => message.get()),
  };
};

const getChatRoomParticipantsService = async (
  chatRoomId: number,
  limit: number,
  offset: number
) => {
  const { count, rows } =
    await ChatParticipant.findAndCountAll({
      where: { chatRoomId },
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'photo'],
        },
      ],
    });

  return {
    count,
    participants: rows.map(row => row.get()),
  };
};

const createChatRoomService = async (
  userId: number,
  name: string,
  direct: boolean,
  participantUserIds: number[]
) => {
  const transaction = await sequelize.transaction();

  const newChatRoom = await ChatRoom.create(
    {
      name,
      context: direct
        ? ChatRoomContext.private
        : ChatRoomContext.group,
    },
    { transaction }
  );

  if (!newChatRoom) {
    throw new Error(Errors.badRequest);
  }

  const allParticipantIds = [
    ...new Set([...participantUserIds, userId]),
  ];

  const formattedParticipants: ChatParticipantType[] =
    allParticipantIds.map(participantId => ({
      userId: participantId,
      chatRoomId: newChatRoom.get().id,
      role:
        participantId === userId
          ? ChatParticipantRole.admin
          : ChatParticipantRole.member,
    }));

  await ChatParticipant.bulkCreate(formattedParticipants, {
    transaction,
  });

  await transaction.commit();

  // Fetch the chat room with participants and return to the client
  const chatRoomWithParticipants = await ChatRoom.findOne({
    where: { id: newChatRoom.get().id },
    include: [
      {
        model: ChatParticipant,
        as: 'participants',
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'photo'],
          },
        ],
      },
    ],
  });

  return {
    newChatRoom: chatRoomWithParticipants,
  };
};

const editChatRoomService = async (
  chatRoomId: number,
  direct: boolean,
  name: string
) => {
  const chatRoom = await ChatRoom.findByPk(chatRoomId);

  if (!chatRoom) {
    return;
  }

  await chatRoom.update({
    context: direct
      ? ChatRoomContext.private
      : ChatRoomContext.group,
    name,
  });
};

const deleteChatRoomService = async (
  chatRoomId: number
) => {
  const chatRoom = await ChatRoom.findByPk(chatRoomId);

  if (!chatRoom) {
    return;
  }

  await chatRoom.destroy();
};

export {
  getChatRoomMessagesService,
  getChatRoomParticipantsService,
  getChatRoomsService,
  createChatRoomService,
  editChatRoomService,
  deleteChatRoomService,
};
