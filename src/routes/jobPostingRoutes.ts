import { Router } from 'express';
import { jobPostingController } from '../controllers/jobPostingController';
import { authentication } from '../middleware/authentication';
import { validate } from '../middleware/inputValidation';
import { jobPostingSchema } from '../validation/jobPostingSchema';
import upload from '../config/multerConfig';
import { jobApplicationSchema } from '../validation/jobApplicationSchema';

const jobPostingRouter = Router();

jobPostingRouter.get('/', jobPostingController.getJobPostings);
jobPostingRouter.post(
  '/',
  [authentication, validate(jobPostingSchema)],
  jobPostingController.create,
);
jobPostingRouter.put(
  '/:id',
  [authentication, validate(jobPostingSchema)],
  jobPostingController.update,
);
jobPostingRouter.post(
  '/:id/apply',
  [upload.single('resume'), validate(jobApplicationSchema)],
  jobPostingController.createJobApplication,
);
jobPostingRouter.delete('/:id', authentication, jobPostingController.delete);

export default jobPostingRouter;
