import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import Unit from '../models/unit.model';

const units = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset =
      parseInt(req.query.offset as string) || 10;

    const { count, rows } = await Unit.findAndCountAll({
      offset,
      limit,
    });

    res.status(200).json({
      total: count,
      units: rows,
    });
  } catch (error) {
    errorHandler(500, Errors.serverError, res);
  }
};

export { units };
