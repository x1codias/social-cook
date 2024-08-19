import { Secret, sign, verify } from 'jsonwebtoken';
import { compare, hash, genSalt } from 'bcryptjs';
import User, { UserType } from '../models/user.model';
import Token, { TokenType } from '../models/token.model';
import { Model, Op } from 'sequelize';
import { Response, Request, NextFunction } from 'express';
import { Errors, errorHandler } from './error.controller';
import moment from 'moment';

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return errorHandler(401, Errors.tokenMissing, res);
  }

  // Extract the token from the header (assuming Bearer <token> format)
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.trim().substring(7)
    : authHeader;

  verify(token, process.env.JWT_KEY, err => {
    if (err) {
      return errorHandler(401, Errors.tokenInvalid, res);
    }

    // Proceed to the next middleware or route handler
    next();
  });
};

const generateToken = async (
  user: Model<UserType, UserType>
): Promise<Model<TokenType, TokenType>> => {
  const token = sign(
    { userId: user.get().id },
    process.env.JWT_KEY as Secret
  );

  const newToken = await Token.create({
    userId: user.get().id,
    experationDate: moment().add(7, 'days').toDate(),
    token,
  });

  return newToken;
};

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, biography } =
      req.body as UserType;

    const photoFileName = req.file
      ? req.file.filename
      : null;

    const salt = await genSalt();

    const encryptedPassword = await hash(password, salt);

    const [newUser, created] = await User.findOrCreate({
      where: {
        [Op.or]: [{ email: email }, { username: username }],
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

    const token = await generateToken(newUser);
    newUser.save();

    res.status(200).json({
      user: {
        id: newUser.dataValues.id,
        username: newUser.dataValues.username,
        email: newUser.dataValues.email,
        biography: newUser.dataValues.biography,
        photo: `http://localhost:3001/uploads/users/${newUser.dataValues.photo}`,
      },
      token: token.dataValues.token,
      severity: 'success',
      message: 'welcomeChef',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { identifier, password } = req.body as {
      identifier: string;
      password: string;
    };

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

    res.status(200).json({
      user: {
        id: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
        biography: user.dataValues.biography,
        photo: `http://localhost:3001/uploads/users/${user.dataValues.photo}`,
      },
      token: token.get().token,
      severity: 'success',
      message: 'welcomeBackChef',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body as {
      userId: number;
    };

    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return errorHandler(401, Errors.userNotFound, res);
    }

    await Token.destroy({
      where: {
        userId: user.get().id,
      },
    });
    await user.save();

    res.status(200).json({
      severity: 'success',
      message: 'hopeToSeeAgainChef',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { verifyToken, register, login, logout };
