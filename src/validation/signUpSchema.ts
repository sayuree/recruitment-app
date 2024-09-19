import * as Joi from 'joi';

export const signUpSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/[a-z]/, 'lowercase')
    .pattern(/[A-Z]/, 'uppercase')
    .pattern(/[0-9]/, 'number')
    .pattern(/[\W_]/, 'special')
    .required()
    .messages({
      'any.required': 'Password is required.',
      'string.min': 'Password must be at least {#limit} characters long.',
      'string.max': 'Password must be at most exceed {#limit} characters long.',
      'string.pattern.name':
        'Password must contain at least one {#name} character.',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match.',
    'any.required': 'Confirm password is required.',
  }),
  first_name: Joi.string().min(1).required(),
  last_name: Joi.string().min(1).required(),
  company: Joi.string().min(1).required(),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Email must be a valid email address.',
  }),
});
