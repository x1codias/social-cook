import { Request, Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  getUserRecipesService,
  getUserService,
  getUsersService,
} from '../services/user.services';

const users = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || '';

    const attributes = ['id', 'photo', 'username'];

    const { total, users } = await getUsersService(
      search,
      attributes
    );

    res.status(200).json({
      total,
      users,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const usersFeed = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);
    const search = (req.query.search as string) || '';
    const attributes = [
      'id',
      'photo',
      'username',
      'biography',
    ];

    const { total, users } = await getUsersService(
      search,
      attributes,
      offset,
      limit,
      true
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

const userRecipes = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, recipes } = await getUserRecipesService(
      parseInt(userId),
      limit,
      offset
    );

    res.status(200).json({
      count,
      recipes,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { users, usersFeed, user, editUser, userRecipes };
