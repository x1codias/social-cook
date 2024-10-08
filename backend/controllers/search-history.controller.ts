import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  deleteSearchHistoryService,
  getSearchHistoryService,
} from '../services/search-history.services';

const searchHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;

    const { total, searchHistory } =
      await getSearchHistoryService(userId);

    res.status(200).json({
      total,
      searchHistory,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const deleteSearch = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { searchIds } = req.body;

    await deleteSearchHistoryService(searchIds);

    res.status(200).json({
      message: 'searchDeleted',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { searchHistory, deleteSearch };
