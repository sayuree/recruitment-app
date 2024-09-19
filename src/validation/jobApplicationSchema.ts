import Joi from 'joi';
const status = ['shortlisted', 'rejected', 'applied'] as const;

export const jobApplicationSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least {#limit} character long.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
});

export const jobApplicationUpdateSchema = Joi.object({
  status: Joi.string()
    .valid(...status)
    .required()
    .messages({
      'any.only': 'Status must be one of shortlisted, rejected, applied',
      'any.required': 'Status is required.',
    }),
});
