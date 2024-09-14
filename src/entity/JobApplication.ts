import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobPosting } from './JobPosting';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => JobPosting,
    (jobPosting) => {
      jobPosting.job_applicatons;
    },
  )
  job_posting: JobPosting;

  @Column()
  applicant_name: string;

  @Column()
  applicant_email: string;

  @Column()
  resume: string;

  @Column()
  status: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  submitted_at: Date;
}
