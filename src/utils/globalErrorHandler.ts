import { Request, NextFunction, Response } from 'express';
import { ErrorMessage } from './errorCodes';

function errorHandler(err: any, _req: Request, res: Response, _: NextFunction) {
  if (err.status) {
    console.log(`Validation error ${err}`);
    return res.status(err.status).json({
      message: err.message,
      error_code: err.error_code || ErrorMessage.API_VALIDATION_ERROR,
    });
  }

  const statusCode = Number(err.error_code);

  if (!Number.isNaN(statusCode)) {
    const logContext = {
      error_code: err.error_code,
      status_code: statusCode,
      context: err.context,
    };

    console.log(`API error: ${JSON.stringify(logContext)} | ${err}`);

    return res.status(statusCode).send({
      error_code: err.error_code,
      message: err.message,
    });
  }

  console.error(`unexpected error: ${err}`);

  return res.status(500).send({
    error_code: 'SERVER_ERROR',
    message:
      'Something unexpected happened, we are investigating this issue right now',
  });
}

export default errorHandler;
