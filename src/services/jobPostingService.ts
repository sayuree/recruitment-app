import { Repository } from 'typeorm';
import { JobPosting } from '../entity/JobPosting';
import { AppDataSource } from '../config/data-source';
import {
  IJobPostingCreateRequest,
  IJobPostingCreateResponse,
  IJobPostingGetRequest,
  IJobPostingGetResponse,
  IJobPostingUpdateRequest,
  IJobPostingUpdateResponse,
} from '../interfaces/jobPosting';
import { AppError } from '../utils/error';
import { ErrorCode } from '../utils/errorCodes';
import {
  IJobApplicationCreateResponse,
  IJobApplicationSubmit,
  IJobApplicatonCreateRequest,
} from '../interfaces/jobApplication';
import { IFileUploadRequest } from '../interfaces/file';
import { fileService } from './fileService';
import { jobApplicationService } from './jobApplicationService';
import jobApplicationSubmittedEvent from '../events/jobApplication';
import { recruiterService } from './recruiterService';

class JobPostingService {
  private jobPostingRepository: Repository<JobPosting>;

  constructor() {
    this.jobPostingRepository = AppDataSource.getRepository(JobPosting);
  }

  public async create(
    jobPosting: IJobPostingCreateRequest,
  ): Promise<IJobPostingCreateResponse> {
    const createdJobPosting = this.jobPostingRepository.create(jobPosting);
    const result = await this.jobPostingRepository.save(createdJobPosting);
    return {
      title: result.title,
      min_salary: result.min_salary,
      max_salary: result.max_salary,
      currency_code: result.currency_code,
      description: result.description,
      location: result.location,
      company: result.company,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }

  public async update(
    id: number,
    jobPosting: IJobPostingUpdateRequest,
  ): Promise<IJobPostingUpdateResponse> {
    const filter = { id: id, deleted_at: null };
    const currentJobPosting = await this.jobPostingRepository.findOneBy(filter);
    if (!currentJobPosting) {
      throw new AppError(ErrorCode.NOT_FOUND, `Job with ID ${id} is not found`);
    }
    currentJobPosting.title = jobPosting.title;
    currentJobPosting.min_salary = jobPosting.min_salary;
    currentJobPosting.max_salary = jobPosting.max_salary;
    currentJobPosting.location = jobPosting.location;
    currentJobPosting.description = jobPosting.description;
    currentJobPosting.company = jobPosting.company;
    const updatedJobPosting =
      await this.jobPostingRepository.save(currentJobPosting);
    const jobPostingUpdateResponse: IJobPostingUpdateResponse = {
      title: updatedJobPosting.title,
      min_salary: updatedJobPosting.min_salary,
      max_salary: updatedJobPosting.max_salary,
      currency_code: updatedJobPosting.currency_code,
      location: updatedJobPosting.location,
      company: updatedJobPosting.company,
      description: updatedJobPosting.company,
      created_at: updatedJobPosting.created_at,
      updated_at: updatedJobPosting.updated_at,
    };
    return jobPostingUpdateResponse;
  }

  public async findById(id: number): Promise<JobPosting | null> {
    const filter = { id: id, deleted_at: null };
    return await this.jobPostingRepository.findOneBy(filter);
  }

  public async createJobApplication(
    jobApplication: IJobApplicatonCreateRequest,
  ): Promise<IJobApplicationCreateResponse> {
    const file = jobApplication.resume;
    if (!file) {
      throw new AppError(
        ErrorCode.API_VALIDATION_ERROR,
        'No file uploaded. Please upload a file and try again.',
      );
    }
    const jobPosting = await jobPostingService.findById(
      jobApplication.job_posting_id,
    );
    if (!jobPosting) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        `Job posting with ID ${jobPosting.id} is not found.`,
      );
    }

    const resumeData: IFileUploadRequest = {
      url: file.path,
      size: file.size,
      original_name: file.originalname,
      mimetype: file.mimetype,
    };
    const uploadedFile = await fileService.create(resumeData);

    const newJobApplication: IJobApplicationSubmit = {
      resume: uploadedFile,
      job_posting: jobPosting,
      applicant_name: jobApplication.applicant_name,
      applicant_email: jobApplication.applicant_email,
    };
    const uploadedJobApplication =
      await jobApplicationService.create(newJobApplication);
    const recruiter = await recruiterService.get(jobPosting.id);
    jobApplicationSubmittedEvent.emit('new-application', {
      title: jobPosting.title,
      recruiter,
    });
    const jobApplicationResponse: IJobApplicationCreateResponse = {
      id: uploadedJobApplication.id,
      name: uploadedJobApplication.applicant_name,
      email: uploadedJobApplication.applicant_email,
      created_at: uploadedJobApplication.submitted_at,
    };
    return jobApplicationResponse;
  }

  public async delete(id: number): Promise<void> {
    const filter = { id: id, deleted_at: null };
    const jobPosting = await this.jobPostingRepository.findOneBy(filter);
    if (!jobPosting) {
      throw new AppError(ErrorCode.NOT_FOUND, `Job with ID ${id} is not found`);
    }
    jobPosting.deleted_at = new Date();

    await this.jobPostingRepository.save(jobPosting);
  }

  public async get({
    page,
    limit,
    title,
    minSalary,
    maxSalary,
    currencyCode,
    location,
    company,
    description,
  }: IJobPostingGetRequest): Promise<IJobPostingGetResponse> {
    const offset = (page - 1) * limit;
    const queryBuilder = this.jobPostingRepository
      .createQueryBuilder('job_posting')
      .where('job_posting.deleted_at is NULL');

    if (title) {
      queryBuilder.andWhere('LOWER(job_posting.title) LIKE LOWER(:title)', {
        title: `%${title}%`,
      });
    }
    if (minSalary && maxSalary) {
      queryBuilder.andWhere(
        'job_posting.min_salary >= :minSalary AND job_posting.max_salary <= :maxSalary',
        { minSalary, maxSalary },
      );
    } else if (minSalary) {
      queryBuilder.andWhere('job_posting.min_salary >= :minSalary', {
        minSalary,
      });
    } else if (maxSalary) {
      queryBuilder.andWhere('job_posting.max_salary <= :maxSalary', {
        maxSalary,
      });
    }

    if (currencyCode) {
      queryBuilder.andWhere(
        'LOWER(job_posting.currency_code) = LOWER(:currencyCode)',
        {
          currencyCode,
        },
      );
    }

    if (location) {
      queryBuilder.andWhere(
        'LOWER(job_posting.location) LIKE LOWER(:location)',
        {
          location: `%${location}%`,
        },
      );
    }

    if (company) {
      queryBuilder.andWhere('LOWER(job_posting.company) LIKE LOWER(:company)', {
        company: `%${company}%`,
      });
    }

    if (description) {
      queryBuilder.andWhere(
        'LOWER(job_posting.description) LIKE LOWER(:description)',
        {
          description: `%${description}%`,
        },
      );
    }

    const [jobPostings, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      jobPostings,
      total,
    };
  }
}

export const jobPostingService = new JobPostingService();
