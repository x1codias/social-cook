import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import {
  cleanSearchHistoryService,
  getPopularSearchesService,
  getSearchHistoryService,
  removeFromSearchHistoryService,
} from '../services/search-history.services';

const searchHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;

    const { searchHistory } = await getSearchHistoryService(
      userId
    );

    res.status(200).json({
      searchHistory,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const popularSearches = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userSearches, recipeSearches } =
      await getPopularSearchesService();

    res.status(200).json({
      userSearches,
      recipeSearches,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const removeFromSearchHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { searchId } = req.body;

    await removeFromSearchHistoryService(searchId);

    res.status(200).json({
      message: 'searchDeleted',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

const cleanSearchHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;

    await cleanSearchHistoryService(userId);

    res.status(200).json({
      message: 'searchDeleted',
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export {
  searchHistory,
  popularSearches,
  removeFromSearchHistory,
  cleanSearchHistory,
};
