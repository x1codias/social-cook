import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  createChatParticipantService,
  deleteChatParticipantService,
  editChatParticipantService,
} from '../services/chat-participant.services';

const createChatParticipant = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { chatRoomId } = req.params;
    const { participantIdId } = req.body;

    const { newChatParticipant } =
      await createChatParticipantService(
        parseInt(chatRoomId),
        userId,
        participantIdId
      );

    res.status(200).json({
      newChatParticipant: newChatParticipant.get(),
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const editChatParticipant = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId, participantId } = req.params;
    const { role } = req.body;

    await editChatParticipantService(
      parseInt(chatRoomId),
      parseInt(participantId),
      role
    );

    res.status(200).json({
      message: 'updatedSuccessfully',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const deleteChatParticipant = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { chatRoomId } = req.params;
    const { participantIds } = req.body;

    await deleteChatParticipantService(
      parseInt(chatRoomId),
      participantIds
    );

    res.status(200).json({
      message: 'deletedSuccessfully',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

export {
  createChatParticipant,
  editChatParticipant,
  deleteChatParticipant,
};
