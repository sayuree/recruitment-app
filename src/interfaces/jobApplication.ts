import { File } from '../entity/File';
import { JobApplication } from '../entity/JobApplication';
import { JobPosting } from '../entity/JobPosting';
import { Recruiter } from '../entity/Recruiter';

export interface IJobApplicatonCreateRequest {
  resume: Express.Multer.File;
  applicant_name: string;
  applicant_email: string;
  job_posting_id: number;
}

export interface IJobApplicationCreateResponse {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

export interface IJobApplicationSubmit {
  resume: File;
  job_posting: JobPosting;
  applicant_name: string;
  applicant_email: string;
  recruiter: Recruiter;
}

export interface IJobApplicationGetResponse {
  jobApplications: JobApplication[];
  total: number;
}
