import { Repository } from 'typeorm';
import { JobApplication } from '../entity/JobApplication';
import { AppDataSource } from '../config/data-source';
import {
  IJobApplicationGetResponse,
  IJobApplicationSubmit,
} from '../interfaces/jobApplication';
import { ErrorCode } from '../utils/errorCodes';
import { AppError } from '../utils/error';

class JobApplicationService {
  private jobApplicationRepository: Repository<JobApplication>;

  constructor() {
    this.jobApplicationRepository = AppDataSource.getRepository(JobApplication);
  }

  public async create(
    jobApplication: IJobApplicationSubmit,
  ): Promise<JobApplication> {
    const createdJobApplication =
      this.jobApplicationRepository.create(jobApplication);
    return await this.jobApplicationRepository.save(createdJobApplication);
  }

  public async get(
    page: number,
    limit: number,
  ): Promise<IJobApplicationGetResponse> {
    const offset = (page - 1) * limit;
    const [jobApplications, total] = await this.jobApplicationRepository
      .createQueryBuilder()
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      jobApplications,
      total,
    };
  }

  public async findOneById(id: number): Promise<JobApplication | null> {
    const filter = { id: id };
    const foundJobApplication =
      await this.jobApplicationRepository.findOneBy(filter);
    if (!foundJobApplication) {
      throw new AppError(
        ErrorCode.NOT_FOUND,
        `Job application with ID ${id} is not found.`,
      );
    }
    return foundJobApplication;
  }

  public async update(
    updatedJobApplication: JobApplication,
  ): Promise<JobApplication> {
    return await this.jobApplicationRepository.save(updatedJobApplication);
  }
}

export const jobApplicationService = new JobApplicationService();
