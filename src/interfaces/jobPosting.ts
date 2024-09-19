import { JobPosting } from '../entity/JobPosting';
import { Recruiter } from '../entity/Recruiter';

export interface IJobPostingCreateRequest {
  title: string;
  min_salary: number;
  max_salary: number;
  currency_code: string;
  location: string;
  company: string;
  description: string;
  recruiter: Recruiter;
}

export interface IJobPostingCreateResponse {
  title: string;
  min_salary: number;
  max_salary: number;
  currency_code: string;
  location: string;
  company: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IJobPostingUpdateRequest {
  title: string;
  min_salary: number;
  max_salary: number;
  currency_code: string;
  location: string;
  company: string;
  description: string;
}

export interface IJobPostingUpdateResponse {
  title: string;
  min_salary: number;
  max_salary: number;
  currency_code: string;
  location: string;
  company: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface IJobPostingGetRequest {
  page: number;
  limit: number;
  title?: string;
  minSalary?: number;
  maxSalary?: number;
  currencyCode?: string;
  location?: string;
  company?: string;
  description?: string;
}

export interface IJobPostingGetResponse {
  jobPostings: JobPosting[];
  total: number;
}
