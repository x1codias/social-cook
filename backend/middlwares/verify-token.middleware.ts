import { NextFunction, Response } from 'express';
import { AuthRequest } from '../controllers/auth.controller';
import {
  errorHandler,
  Errors,
} from '../controllers/error.controller';
import { verify } from 'jsonwebtoken';

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!authHeader) {
    return errorHandler(401, Errors.tokenMissing, res);
  }

  // Extract the token from the header (assuming Bearer <token> format)
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.trim().substring(7)
    : authHeader;

  verify(
    token,
    process.env.JWT_KEY as string,
    (err, user) => {
      if (err) {
        return errorHandler(401, Errors.tokenInvalid, res);
      }
      (req as AuthRequest).user = user as {
        userId: number;
      };

      // Proceed to the next middleware or route handler
      next();
    }
  );
};
