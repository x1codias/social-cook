import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import ChatParticipant, {
  ChatParticipantRole,
  ChatParticipantType,
} from '../models/chat/chat-participant.model';
import ChatRoom, {
  ChatRoomContext,
} from '../models/chat/chat-room.model';
import User from '../models/user.model';
import sequelize from '../sequelize';
import {
  createChatRoomService,
  deleteChatRoomService,
  editChatRoomService,
  getChatRoomMessagesService,
  getChatRoomParticipantsService,
  getChatRoomsService,
} from '../services/chat-room.services';

const chatRooms = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, chatRooms } = await getChatRoomsService(
      limit,
      offset,
      userId
    );

    res.status(200).json({
      count,
      chatRooms,
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const chatRoomMessages = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, messages } =
      await getChatRoomMessagesService(
        parseInt(chatRoomId),
        limit,
        offset
      );

    res.status(200).json({
      count,
      messages,
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const chatRoomParticipants = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, participants } =
      await getChatRoomParticipantsService(
        parseInt(chatRoomId),
        limit,
        offset
      );

    res.status(200).json({
      count,
      participants,
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const createChatRoom = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { participantUserIds, direct, name } = req.body;

    const { newChatRoom } = await createChatRoomService(
      userId,
      name,
      direct,
      participantUserIds
    );

    res.status(200).json({
      newChatRoom,
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const editChatRoom = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;
    const { direct, name } = req.body;

    await editChatRoomService(
      parseInt(chatRoomId),
      direct,
      name
    );

    res.status(200).json({
      message: 'updatedSuccessfully',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const deleteChatRoom = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;

    await deleteChatRoomService(parseInt(chatRoomId));

    res.status(200).json({
      message: 'deletedSuccessfully',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

export {
  chatRoomMessages,
  chatRoomParticipants,
  chatRooms,
  createChatRoom,
  editChatRoom,
  deleteChatRoom,
};
