import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Recruiter } from '../entity/Recruiter';
import { JobPosting } from '../entity/JobPosting';
import { JobApplication } from '../entity/JobApplication';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Recruiter, JobPosting, JobApplication],
  migrations: [],
  subscribers: [],
});
