import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recruiter } from './Recruiter';
import { JobApplication } from './JobApplication';

@Entity()
@Check('"min_salary" <= "max_salary"')
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  min_salary: number;

  @Column()
  max_salary: number;

  @Column({ length: 3 })
  currency_code: string;

  @Column()
  location: string;

  @Column({ length: 50 })
  company: string;

  @Column('text')
  description: string;

  @ManyToOne(
    () => Recruiter,
    (recruiter) => {
      recruiter.job_postings;
    },
  )
  @JoinColumn({ name: 'recruiter_id' })
  recruiter: Recruiter;

  @OneToMany(
    () => JobApplication,
    (job_applications) => {
      job_applications.job_posting;
    },
  )
  job_applications: JobApplication[];

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
