import Joi from 'joi';

export const jobPostingSchema = Joi.object({
  title: Joi.string().min(1).max(100).required().messages({
    'string.base': 'Title must be a string.',
    'string.empty': 'Title cannot be empty.',
    'string.min': 'Title must be at least {#limit} character long.',
    'string.max': 'Title must be at most {#limit} characters long.',
    'any.required': 'Title is required.',
  }),
  minSalary: Joi.number().positive().required().messages({
    'number.base': 'Minimum salary must be a number.',
    'any.required': 'Minimum salary is required.',
  }),
  maxSalary: Joi.number().positive().required().messages({
    'number.base': 'Maximum salary must be a number.',
    'any.required': 'Maximum salary is required.',
  }),
  currencyCode: Joi.string().required().messages({
    'string.base': 'Currency code must be a string.',
    'any.required': 'Currency code is required.',
  }),
  location: Joi.string().min(1).required().messages({
    'string.base': 'Location must be a string.',
    'any.required': 'Location is required.',
  }),
  company: Joi.string().min(1).required(),
  description: Joi.string().trim().min(10).max(1000).messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description cannot be empty.',
    'string.min': 'Description must be at least {#limit} characters long.',
    'string.max': 'Description cannot be more than {#limit} characters long.',
    'any.required': 'Description is required.',
  }),
});
