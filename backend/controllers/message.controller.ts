import { Response } from 'express';
import { AuthRequest } from './auth.controller';
import { errorHandler } from './error.controller';
import {
  createMessageService,
  deleteMessageService,
  editMessageService,
} from '../services/message.services';

const createMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
    const { chatRoomId } = req.params;
    const { content } = req.body;

    const { message } = await createMessageService(
      userId,
      parseInt(chatRoomId),
      content
    );

    res.status(200).json({
      message: 'messageSuccessfull',
      messageSent: message,
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const editMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    await editMessageService(parseInt(messageId), content);

    res.status(200).json({
      message: 'messageUpdatedSuccefully',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

const deleteMessage = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { messageId } = req.params;

    await deleteMessageService(parseInt(messageId));

    res.status(200).json({
      message: 'messageDeleted',
    });
  } catch (err) {
    errorHandler(err.message, res);
  }
};

export { createMessage, editMessage, deleteMessage };
