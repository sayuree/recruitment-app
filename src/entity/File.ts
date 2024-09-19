import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { JobApplication } from './JobApplication';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  original_name: string;

  @Column('int')
  size: number;

  @Column()
  mimetype: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @OneToOne(() => JobApplication, (jobApplication) => jobApplication.resume, {
    nullable: true,
  })
  jobApplication: JobApplication;
}
