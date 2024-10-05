import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import Setting from '../models/setting.model';
import { AuthRequest } from './auth.controller';

const editSettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { lang, isPrivate } = req.body;
    const { userId } = req.user;

    const settingToUpdate = await Setting.findOne({
      where: { userId },
    });

    if (!settingToUpdate) {
      return errorHandler(404, Errors.noSettings, res);
    }

    await settingToUpdate.update({
      lang,
      isPrivate,
    });
    await settingToUpdate.save();

    res.status(200).json({
      message: 'settingsUpdated',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export { editSettings };
