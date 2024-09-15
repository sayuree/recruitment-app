import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recruiter } from './Recruiter';
import { JobApplication } from './JobApplication';

@Entity()
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'int8range', nullable: true })
  salary: string;

  @Column()
  location: string;

  @Column()
  company: string;

  @Column()
  description: string;

  @ManyToOne(
    () => Recruiter,
    (recruiter) => {
      recruiter.job_postings;
    },
  )
  recruiter: Recruiter;

  @OneToMany(
    () => JobApplication,
    (jobApplication) => {
      jobApplication.job_posting;
    },
  )
  job_applicatons: JobApplication[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date;
}
