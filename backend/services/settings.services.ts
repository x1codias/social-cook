import { Errors } from '../controllers/error.controller';
import Setting, {
  SettingLangs,
} from '../models/setting.model';

export const editUserSettingsService = async (
  userId: number,
  lang: SettingLangs,
  isPrivate: boolean
) => {
  const settingToUpdate = await Setting.findOne({
    where: { userId },
  });

  if (!settingToUpdate) {
    throw new Error(Errors.noSettings);
  }

  await settingToUpdate.update({
    lang,
    isPrivate,
  });
  await settingToUpdate.save();
};
