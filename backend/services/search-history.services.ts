import { Op, Sequelize } from 'sequelize';
import SearchHistory from '../models/search-history.model';

const getSearchHistoryService = async (userId: number) => {
  const searches = await SearchHistory.findAll({
    limit: 5,
    where: {
      userId,
    },
  });

  return {
    searchHistory: searches.map(
      search => search.dataValues
    ),
  };
};

const getPopularSearchesService = async () => {
  const recipeSearches = await SearchHistory.findAll({
    attributes: [
      'value',
      [
        Sequelize.fn('COUNT', Sequelize.col('value')),
        'searchCount',
      ], // Count occurrences
    ],
    where: {
      context: 'recipe',
    },
    group: ['recipeId'],
    order: [[Sequelize.literal('searchCount'), 'DESC']], // Order by searchCount (highest first)
    limit: 10,
  });

  const userSearches = await SearchHistory.findAll({
    attributes: [
      'value',
      [
        Sequelize.fn('COUNT', Sequelize.col('value')),
        'searchCount',
      ], // Count occurrences
    ],
    where: {
      context: 'user',
    },
    group: ['value'],
    order: [[Sequelize.literal('searchCount'), 'DESC']], // Order by searchCount (highest first)
    limit: 10, // Limit to top 10 results
  });

  return {
    recipeSearches,
    userSearches,
  };
};

const removeFromSearchHistoryService = async (
  searchId: number
) => {
  await SearchHistory.destroy({
    where: {
      id: searchId,
    },
  });
};

const cleanSearchHistoryService = async (
  userId: number
) => {
  await SearchHistory.destroy({
    where: {
      userId,
    },
  });
};

export {
  getSearchHistoryService,
  getPopularSearchesService,
  removeFromSearchHistoryService,
  cleanSearchHistoryService,
};
