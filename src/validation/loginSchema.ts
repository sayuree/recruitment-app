import Joi from 'joi';

export const loginSchema = Joi.object({
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
});
