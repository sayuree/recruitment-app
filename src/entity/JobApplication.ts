import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobPosting } from './JobPosting';
import { File } from './File';
import { Recruiter } from './Recruiter';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => JobPosting,
    (job_posting) => {
      job_posting.job_applications;
    },
  )
  @JoinColumn({ name: 'job_posting_id' })
  job_posting: JobPosting;

  @OneToOne(() => File, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'resume_id' })
  resume: File;

  @ManyToOne(
    () => Recruiter,
    (recruiter) => {
      recruiter.job_applications;
    },
  )
  @JoinColumn({ name: 'recruiter_id' })
  recruiter: Recruiter;

  @Column()
  applicant_name: string;

  @Column()
  applicant_email: string;

  @Column('enum', {
    enum: ['shortlisted', 'rejected', 'applied'],
    default: 'applied',
  })
  status: 'shortlisted' | 'rejected' | 'applied';

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  submitted_at: Date;
}
