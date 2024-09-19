import { Router } from 'express';
import { jobApplicationController } from '../controllers/jobApplicationController';
import { authentication } from '../middleware/authentication';
import { validate } from '../middleware/inputValidation';
import { jobApplicationUpdateSchema } from '../validation/jobApplicationSchema';

const jobApplicationRoute = Router();

jobApplicationRoute.get(
  '/',
  authentication,
  jobApplicationController.getJobApplications,
);
jobApplicationRoute.get(
  '/:id',
  authentication,
  jobApplicationController.getOneById,
);
jobApplicationRoute.patch(
  '/:id/status',
  [authentication, validate(jobApplicationUpdateSchema)],
  jobApplicationController.updateStatus,
);

export default jobApplicationRoute;
