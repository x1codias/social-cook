import { UserType } from '../models/user.model';
import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import {
  facebookAuthService,
  googleAuthService,
  loginService,
  logoutService,
  registerService,
} from '../services/auth.services';

export interface AuthRequest extends Request {
  user: { userId: number };
}

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, biography } =
      req.body as UserType;

    const photoFileName = req.file
      ? req.file.filename
      : null;

    const { user, token } = await registerService(
      username,
      email,
      password,
      biography,
      photoFileName,
      res
    );

    res.status(200).json({
      user,
      token,
      severity: 'success',
      message: 'welcomeChef',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body as {
      identifier: string;
      password: string;
    };

    const { user, token } = loginService(
      identifier,
      password,
      res
    );

    res.status(200).json({
      user,
      token,
      severity: 'success',
      message: 'welcomeBackChef',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const logout = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.user;

    await logoutService(userId, res);

    res.status(200).json({
      severity: 'success',
      message: 'hopeToSeeAgainChef',
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const googleAuthentication = async (
  req: Request,
  res: Response
) => {
  try {
    const authorizationHeader =
      req.headers['authorization'];

    const { user, token, created } =
      await googleAuthService(authorizationHeader, res);

    res.status(200).json({
      severity: 'success',
      message: created ? 'welcomeChef' : 'welcomeBackChef',
      user,
      token,
      registered: created,
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

const facebookAuthentication = async (
  req: Request,
  res: Response
) => {
  try {
    const authorizationHeader =
      req.headers['authorization'];

    const { user, token, created } = facebookAuthService(
      authorizationHeader,
      res
    );

    res.status(200).json({
      severity: 'success',
      message: created ? 'welcomeChef' : 'welcomeBackChef',
      user,
      token,
      registered: created,
    });
  } catch (error) {
    return errorHandler(500, Errors.serverError, res);
  }
};

export {
  register,
  login,
  logout,
  googleAuthentication,
  facebookAuthentication,
};
