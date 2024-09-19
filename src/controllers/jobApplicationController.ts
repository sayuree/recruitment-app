import { NextFunction, Request, Response } from 'express';
import { jobApplicationService } from '../services/jobApplicationService';

class JobApplicationController {
  public async getJobApplications(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;

      const { jobApplications, total } = await jobApplicationService.get(
        page,
        limit,
      );
      return res.status(200).json({
        page,
        limit,
        totalRecords: total,
        pages: Math.ceil(total / limit),
        data: jobApplications,
      });
    } catch (error) {
      next(error);
    }
  }

  public async getOneById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const jobApplication = await jobApplicationService.findOneById(
        Number(id),
      );

      return res.status(200).json({
        status: 'success',
        data: jobApplication,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const jobApplication = await jobApplicationService.findOneById(
        Number(id),
      );
      jobApplication.status = status;
      const updatedJobApplication =
        await jobApplicationService.update(jobApplication);
      return res.status(200).json({
        status: 'success',
        data: updatedJobApplication,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const jobApplicationController = new JobApplicationController();
