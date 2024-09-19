import { NextFunction, Request, Response } from 'express';
import { jobPostingService } from '../services/jobPostingService';
import { IJobApplicatonCreateRequest } from '../interfaces/jobApplication';
import RequestWithUser from '../interfaces/requestWithUser';
import {
  IJobPostingCreateRequest,
  IJobPostingGetRequest,
  IJobPostingUpdateRequest,
} from '../interfaces/jobPosting';

class JobPostingController {
  public async getJobPostings(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const {
        title,
        minSalary,
        maxSalary,
        currencyCode,
        location,
        description,
        company,
      } = req.query;
      const minSalaryNumber = minSalary ? Number(minSalary) : undefined;
      const maxSalaryNumber = maxSalary ? Number(maxSalary) : undefined;
      const jobPostingFilter: IJobPostingGetRequest = {
        page,
        limit,
        title: title as string,
        minSalary: minSalaryNumber,
        maxSalary: maxSalaryNumber,
        currencyCode: currencyCode as string,
        location: location as string,
        description: description as string,
        company: company as string,
      };
      const { jobPostings, total } =
        await jobPostingService.get(jobPostingFilter);
      return res.status(200).json({
        page,
        limit,
        totalRecords: total,
        pages: Math.ceil(total / limit),
        data: jobPostings,
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const {
        title,
        minSalary,
        maxSalary,
        currencyCode,
        location,
        company,
        description,
      } = req.body;
      const recruiter = req.user;
      const jobPostingData: IJobPostingCreateRequest = {
        title,
        min_salary: Number(minSalary),
        max_salary: Number(maxSalary),
        currency_code: currencyCode,
        location,
        company,
        description,
        recruiter,
      };
      const newJobPosting = await jobPostingService.create(jobPostingData);
      return res.status(201).json({
        status: 'success',
        data: newJobPosting,
      });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const {
        title,
        minSalary,
        maxSalary,
        currencyCode,
        location,
        description,
        company,
      } = req.body;
      const jobPosting: IJobPostingUpdateRequest = {
        title,
        min_salary: Number(minSalary),
        max_salary: Number(maxSalary),
        currency_code: currencyCode,
        location,
        company,
        description,
      };
      const updatedJobPosting = await jobPostingService.update(
        Number(id),
        jobPosting,
      );
      return res.status(200).json({
        status: 'success',
        data: updatedJobPosting,
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await jobPostingService.delete(Number(id));
      return res.status(200).json({
        message: 'Job posting successfully deleted',
      });
    } catch (error) {
      next(error);
    }
  }

  public async createJobApplication(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, email } = req.body;
      const jobApplication: IJobApplicatonCreateRequest = {
        resume: req.file,
        applicant_name: name,
        applicant_email: email,
        job_posting_id: Number(req.params.id),
      };

      const uploadedJobApplication =
        await jobPostingService.createJobApplication(jobApplication);
      return res.status(200).json({
        status: 'success',
        data: uploadedJobApplication,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const jobPostingController = new JobPostingController();
