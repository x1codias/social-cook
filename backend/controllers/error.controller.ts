import { Response } from 'express';

export enum Errors {
  emailPassword = 'incorrectEmailPassword',
  userExists = 'userAlreadyExists',
  userNotFound = 'userNotFound',
  serverError = 'serverError',
  tokenMissing = 'missingToken',
  tokenInvalid = 'invalidToken',
  recipeExists = 'recipeAlreadyExists',
  ingredientExists = 'ingredientAlreadyExists',
  directoryReading = 'directoryReading',
  imageNotFound = 'imageNotFound',
  noSettings = 'noSettings',
  noNotificationSettings = 'noNotificationSettings',
  duplicateFollow = 'duplicateFollow',
  noFollow = 'noFollow',
  duplicateBlock = 'duplicateBlock',
  noBlock = 'noBlock',
  recipeDoesntExist = 'recipeDoesntExist',
  badRequest = 'badRequest',
  notFound = 'notFound',
  noPermission = 'noPermission',
}

export const errorHandler = (
  key: Errors,
  res: Response
) => {
  // Determine the HTTP status code based on the error type
  let statusCode: number;

  switch (key) {
    case Errors.emailPassword:
    case Errors.tokenInvalid:
    case Errors.noPermission:
      statusCode = 401; // Unauthorized
      break;

    case Errors.userExists:
    case Errors.recipeExists:
    case Errors.ingredientExists:
    case Errors.duplicateFollow:
    case Errors.duplicateBlock:
      statusCode = 409; // Conflict
      break;

    case Errors.userNotFound:
    case Errors.imageNotFound:
    case Errors.recipeDoesntExist:
    case Errors.noSettings:
    case Errors.noNotificationSettings:
    case Errors.noFollow:
    case Errors.noBlock:
    case Errors.notFound:
      statusCode = 404; // Not Found
      break;

    case Errors.tokenMissing:
    case Errors.badRequest:
      statusCode = 400; // Bad Request
      break;

    case Errors.directoryReading:
      statusCode = 500; // Server Error
      break;

    default:
      statusCode = 500; // Default to Server Error for any unexpected issues
  }

  // Send the error response
  const errorResponse = {
    severity: 'error',
    message: key,
  };

  res.status(statusCode).json(errorResponse);
};
