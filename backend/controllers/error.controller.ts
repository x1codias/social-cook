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
}

export const errorHandler = (
  code: number,
  key: Errors,
  res: Response
) => {
  const errorResponse = {
    severity: 'error',
    message: key,
  };

  res.status(code).json(errorResponse);
};
