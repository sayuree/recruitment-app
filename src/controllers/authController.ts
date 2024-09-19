import { NextFunction, Request, Response } from 'express';
import {
  IRecruiterCreateRequest,
  IRecruiterLoginRequest,
} from '../interfaces/recruiter';
import { recruiterService } from '../services/recruiterService';

class AuthController {
  public async signup(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const recruiter = await recruiterService.create(
        req.body as IRecruiterCreateRequest,
      );

      return res.status(201).json({
        status: 'success',
        data: recruiter,
      });
    } catch (error) {
      next(error);
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const tokenData = await recruiterService.login(
        req.body as IRecruiterLoginRequest,
      );

      return res.status(201).json({
        status: 'success',
        token: tokenData.token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
