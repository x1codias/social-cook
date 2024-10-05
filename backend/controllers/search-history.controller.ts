import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import SearchHistory from '../models/search-history.model';
import { Op } from 'sequelize';
import { AuthRequest } from './auth.controller';

const searchHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { userId } = req.user;

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
  req: AuthRequest,
  res: Response
) => {
  try {
    const { searchIds } = req.body;

    await SearchHistory.destroy({
      where: {
        id: { [Op.in]: searchIds },
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
