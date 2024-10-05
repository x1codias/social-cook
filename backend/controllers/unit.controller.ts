import { Response } from 'express';
import { Errors, errorHandler } from './error.controller';
import Unit from '../models/unit.model';
import { AuthRequest } from './auth.controller';

const units = async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { count, rows } = await Unit.findAndCountAll({
      offset,
      limit,
    });

    res.status(200).json({
      total: count,
      units: rows.map(row => row.dataValues),
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { units };
