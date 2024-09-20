import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './JobPosting';
import { JobApplication } from './JobApplication';

@Entity()
export class Recruiter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 50 })
  first_name: string;

  @Column({ length: 50 })
  last_name: string;

  @Column()
  password: string;

  @OneToMany(() => JobPosting, (jobPosting) => jobPosting.recruiter)
  job_postings: JobPosting[];

  @OneToMany(
    () => JobApplication,
    (job_applications) => job_applications.recruiter,
  )
  job_applications: JobApplication[];

  @Column({ length: 50 })
  company: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
