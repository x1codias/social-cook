import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import SearchHistory from '../models/search-history.model';
import { Op } from 'sequelize';

const searchHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.body;

    const { count, rows } =
      await SearchHistory.findAndCountAll({
        offset: 0,
        limit: 5,
        where: {
          userId,
        },
      });

    res.status(200).json({
      total: count,
      searchHistory: rows.map(row => row.dataValues),
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

const deleteSearch = async (
  req: Request,
  res: Response
) => {
  try {
    const { searchIds } = req.body;

    await SearchHistory.destroy({
      where: {
        userId: { [Op.in]: searchIds },
      },
    });

    res.status(200).json({
      message: 'searchDeleted',
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { searchHistory, deleteSearch };
