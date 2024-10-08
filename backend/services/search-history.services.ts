import { Op } from 'sequelize';
import SearchHistory from '../models/search-history.model';

const getSearchHistoryService = async (userId: number) => {
  const { count, rows } =
    await SearchHistory.findAndCountAll({
      offset: 0,
      limit: 5,
      where: {
        userId,
      },
    });

  return {
    total: count,
    searchHistory: rows.map(row => row.dataValues),
  };
};

const deleteSearchHistoryService = async (
  searchIds: number[]
) => {
  await SearchHistory.destroy({
    where: {
      id: { [Op.in]: searchIds },
    },
  });
};

export {
  getSearchHistoryService,
  deleteSearchHistoryService,
};
