import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { recruiterService } from '../services/recruiterService';
import RequestWithUser from '../interfaces/requestWithUser';
import { AppError } from '../utils/error';
import { ErrorCode } from '../utils/errorCodes';

export const authentication = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction,
) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(ErrorCode.UNAUTHORIZED, 'Invalid token'));
  }

  const jwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await recruiterService.findById(jwtPayload.id);

  if (!user) {
    return next(new AppError(ErrorCode.NOT_FOUND, 'User is not found.'));
  }
  req.user = user;

  return next();
};
