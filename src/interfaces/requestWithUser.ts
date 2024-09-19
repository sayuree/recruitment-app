import { Request } from 'express';
import { Recruiter } from '../entity/Recruiter';

interface RequestWithUser extends Request {
  user: Recruiter;
}

export default RequestWithUser;
