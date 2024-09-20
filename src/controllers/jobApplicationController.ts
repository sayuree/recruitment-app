import { NextFunction, Response } from 'express';
import { jobApplicationService } from '../services/jobApplicationService';
import RequestWithUser from '../interfaces/requestWithUser';

class JobApplicationController {
  public async getJobApplications(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const recruiter_id = req.user.id;
      const { jobApplications, total } = await jobApplicationService.get(
        page,
        limit,
        recruiter_id,
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

  public async getOneById(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const recruiter_id = req.user.id;
      const jobApplication = await jobApplicationService.findOneById(
        Number(id),
        recruiter_id,
      );

      return res.status(200).json({
        status: 'success',
        data: jobApplication,
      });
    } catch (error) {
      next(error);
    }
  }

  public async updateStatus(
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const recruiter_id = req.user.id;
      const jobApplication = await jobApplicationService.findOneById(
        Number(id),
        recruiter_id,
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
