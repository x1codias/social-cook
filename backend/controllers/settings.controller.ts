import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import { editUserSettingsService } from '../services/settings.services';

const editSettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { lang, isPrivate } = req.body;
    const { userId } = req.user;

    await editUserSettingsService(userId, lang, isPrivate);

    res.status(200).json({
      message: 'settingsUpdated',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { editSettings };
