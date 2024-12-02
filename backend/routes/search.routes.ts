import { Router } from 'express';
import { verifyToken } from '../middlwares/verify-token.middleware';
import {
  cleanSearchHistory,
  popularSearches,
  removeFromSearchHistory,
  searchHistory,
} from '../controllers/search-history.controller';

const searchRoutes = Router();

searchRoutes.get(
  '/search-history',
  verifyToken,
  searchHistory
);

searchRoutes.get(
  '/popular-searches',
  verifyToken,
  popularSearches
);

searchRoutes.delete(
  '/search-history/:id',
  verifyToken,
  removeFromSearchHistory
);

searchRoutes.delete(
  '/search-history',
  verifyToken,
  cleanSearchHistory
);

export default searchRoutes;
