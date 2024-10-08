import { Response } from 'express';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import Setting, {
  SettingLangs,
} from '../models/setting.model';

export const editUserSettingsService = async (
  userId: number,
  res: Response,
  lang: SettingLangs,
  isPrivate: boolean
) => {
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
};
