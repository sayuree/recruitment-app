import { Router } from 'express';
import { authController } from '../controllers/authController';
import { signUpSchema } from '../validation/signUpSchema';
import { validate } from '../middleware/inputValidation';
import { loginSchema } from '../validation/loginSchema';
const authRouter = Router();

authRouter.post('/signup', validate(signUpSchema), authController.signup);
authRouter.post('/login', validate(loginSchema), authController.login);

export default authRouter;
