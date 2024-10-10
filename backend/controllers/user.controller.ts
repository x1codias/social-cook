import { Request, Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  getUserService,
  getUsersService,
} from '../services/user.services';

const users = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const username = (req.query.username as string) || '';

    const { total, users } = await getUsersService(
      offset,
      limit,
      username
    );

    res.status(200).json({
      total,
      users,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const user = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { user } = await getUserService(parseInt(userId));

    res.status(200).json({
      user,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const editUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { users, user, editUser };
