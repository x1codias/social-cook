import { Response } from 'express';
import { errorHandler } from './error.controller';
import { AuthRequest } from './auth.controller';
import { getUnitsService } from '../services/unit.services';

const units = async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string);
    const offset = parseInt(req.query.offset as string);

    const { total, units } = await getUnitsService(
      offset,
      limit
    );

    res.status(200).json({
      total,
      units,
    });
  } catch (error) {
    errorHandler(error.message, res);
  }
};

export { units };
