import { Response } from 'express'

export enum Errors {
  emailPassword = 'incorrectEmailPassword',
  userExists = 'userAlreadyExists',
  userNotFound = 'userNotFound',
  serverError = 'serverError',
}

export const errorHandler = (
  code: number,
  key: string,
  res: Response
) => {
  const errorResponse = {
    severity: 'error',
    message: key,
  }

  return res.status(code).json(errorResponse)
}
