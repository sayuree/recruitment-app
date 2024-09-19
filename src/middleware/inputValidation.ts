import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ErrorCode } from '../utils/errorCodes';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(ErrorCode.API_VALIDATION_ERROR).json({
        status: 'fail',
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }
    next();
  };
};
