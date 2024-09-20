import { Repository } from 'typeorm';
import { Recruiter } from '../entity/Recruiter';
import { AppDataSource } from '../config/data-source';
import {
  IRecruiterCreateRequest,
  IRecruiterCreateResponse,
  IRecruiterLoginRequest,
  IRecruiterLoginResponse,
} from '../interfaces/recruiter';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { AppError } from '../utils/error';
import { ErrorCode } from '../utils/errorCodes';

export class RecruiterService {
  private recruiterRepository: Repository<Recruiter>;

  constructor() {
    this.recruiterRepository = AppDataSource.getRepository(Recruiter);
  }

  public async create(
    recruiter: IRecruiterCreateRequest,
  ): Promise<IRecruiterCreateResponse> {
    const filter = {
      email: recruiter.email,
    };

    const recruiterFound = await this.recruiterRepository.findOneBy(filter);
    if (recruiterFound) {
      throw new AppError(
        ErrorCode.UNPROCESSABLE,
        `User with email ${recruiter.email} already exists.`,
      );
    }
    if (recruiter.password !== recruiter.confirmPassword) {
      throw new AppError(ErrorCode.UNAUTHORIZED, 'Password is invalid.');
    }
    recruiter.password = bcrypt.hashSync(recruiter.password, 10);
    const newRecruiter = this.recruiterRepository.create(recruiter);
    await this.recruiterRepository.save(newRecruiter);
    const token = generateToken({
      id: newRecruiter.id,
    });

    const recruiterCreationResponse: IRecruiterCreateResponse = {
      id: newRecruiter.id,
      first_name: recruiter.first_name,
      last_name: recruiter.last_name,
      email: recruiter.email,
      created_at: newRecruiter.created_at,
      token: token,
      company: newRecruiter.company,
    };

    return recruiterCreationResponse;
  }

  public async login(
    recruiter: IRecruiterLoginRequest,
  ): Promise<IRecruiterLoginResponse> {
    const filter = {
      email: recruiter.email,
    };

    const recruiterFound = await this.recruiterRepository.findOneBy(filter);
    const isPasswordMatching = bcrypt.compareSync(
      recruiter.password,
      recruiterFound.password,
    );
    if (!recruiterFound || !isPasswordMatching) {
      throw new AppError(
        ErrorCode.UNAUTHORIZED,
        'Incorrect email or password.',
      );
    }
    const token = generateToken({
      id: recruiterFound.id,
    });

    return { token: token };
  }

  public async findById(id: string): Promise<Recruiter | null> {
    const filter = { id: id };
    return await this.recruiterRepository.findOneBy(filter);
  }

  public async get(job_posting_id: number): Promise<Recruiter> {
    return await this.recruiterRepository
      .createQueryBuilder('recruiter')
      .leftJoinAndSelect('recruiter.job_postings', 'jobPosting')
      .where('jobPosting.id = :id', { id: job_posting_id })
      .getOne();
  }
}

const generateToken = (payload: { id: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const recruiterService = new RecruiterService();
