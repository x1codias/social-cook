import { compare, genSalt, hash } from 'bcryptjs';
import User from '../models/user.model';
import Setting, {
  SettingLangs,
} from '../models/setting.model';
import NotificationSetting from '../models/notification-setting.model';
import { generateToken } from './token.service';
import { Op } from 'sequelize';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { Response } from 'express';
import sequelize from '../sequelize';
import Token from '../models/token.model';

const registerService = async (
  username: string,
  email: string,
  password: string,
  biography: string,
  photoFileName: string,
  res: Response
) => {
  const salt = await genSalt(12); // Increase salt length for security.
  const encryptedPassword = await hash(password, salt);

  const [newUser, created] = await User.findOrCreate({
    where: {
      [Op.or]: [{ email }, { username }],
    },
    defaults: {
      username,
      email,
      password: encryptedPassword,
      biography,
      photo: photoFileName,
    },
  });

  if (!created) {
    return errorHandler(409, Errors.userExists, res);
  }

  await sequelize.transaction(async t => {
    await Setting.create(
      {
        userId: newUser.get().id,
        lang: SettingLangs.en,
        isPrivate: true,
      },
      { transaction: t }
    );

    await NotificationSetting.create(
      {
        userId: newUser.get().id,
        follow: true,
        comment: true,
        rating: true,
        likeComment: true,
        mention: true,
      },
      { transaction: t }
    );
  });

  const token = await generateToken(newUser);

  return {
    user: {
      id: newUser.get().id,
      username: newUser.get().username,
      email: newUser.get().email,
      biography: newUser.get().biography,
      photo: `${process.env.BASE_URL}/uploads/users/${
        newUser.get().photo
      }`,
      settings: {
        lang: SettingLangs.en,
        private: true,
      },
      notificationSettings: {
        follow: true,
        comment: true,
        rating: true,
        likeComment: true,
        mention: true,
      },
    },
    token,
  };
};

const loginService = async (
  identifier: string,
  password: string,
  res: Response
) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { username: identifier },
      ],
    },
  });

  if (!user)
    return errorHandler(401, Errors.emailPassword, res);

  const isValidPassword = await compare(
    password,
    user.get().password
  );

  if (!isValidPassword)
    return errorHandler(401, Errors.emailPassword, res);

  const token = await generateToken(user);
  await user.save();

  return {
    user: {
      id: user.get().id,
      username: user.get().username,
      email: user.get().email,
      biography: user.get().biography,
      photo: `http://localhost:3001/uploads/users/${
        user.get().photo
      }`,
    },
    token: token.get().token,
  };
};

const logoutService = async (
  userId: number,
  res: Response
) => {
  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    return errorHandler(404, Errors.userNotFound, res);
  }

  await Token.destroy({
    where: {
      userId: user.get().id,
    },
  });
};

const googleAuthService = async (
  authorizationHeader: string,
  res: Response
) => {
  if (!authorizationHeader) {
    return errorHandler(401, Errors.tokenMissing, res);
  }

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    return errorHandler(401, Errors.tokenInvalid, res);
  }

  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  const [newUser, created] = await User.findOrCreate({
    where: {
      [Op.or]: [
        { email: data.email },
        { googleId: data.sub },
      ],
    },
    defaults: {
      username: data.email.split('@')[0],
      email: data.email,
      googleId: data.sub,
      photo: data.picture,
    },
  });

  const token = await generateToken(newUser);

  return {
    user: {
      id: newUser.dataValues.id,
      username: newUser.dataValues.username,
      email: newUser.dataValues.email,
      biography: newUser.dataValues.biography,
      photo: newUser.dataValues.photo,
    },
    token: token.dataValues.token,
    created,
  };
};

const facebookAuthService = async (
  authorizationHeader: string,
  res: Response
) => {
  if (!authorizationHeader) {
    return errorHandler(401, Errors.tokenMissing, res);
  }

  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    return errorHandler(401, Errors.tokenInvalid, res);
  }

  const response = await fetch(
    `https://graph.facebook.com/v20.0/me?fields=id%2Cname%2Cpicture%2Cemail&access_token=${accessToken}`
  );

  const data = await response.json();

  const [newUser, created] = await User.findOrCreate({
    where: {
      [Op.or]: [
        { email: data.email },
        { facebookId: data.id },
      ],
    },
    defaults: {
      username: data.email.split('@')[0],
      email: data.email,
      facebookId: data.id,
      photo: data.picture.data.url,
    },
  });

  const token = await generateToken(newUser);
  newUser.save();

  return {
    user: {
      id: newUser.dataValues.id,
      username: newUser.dataValues.username,
      email: newUser.dataValues.email,
      biography: newUser.dataValues.biography,
      photo: newUser.dataValues.photo,
    },
    token: token.dataValues.token,
    created,
  };
};

export {
  registerService,
  loginService,
  logoutService,
  googleAuthService,
  facebookAuthService,
};
