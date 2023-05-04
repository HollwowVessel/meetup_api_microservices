import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  role: Joi.string()
    .pattern(/creator|user/, 'user, creator')
    .optional(),
});

export const userPatchSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  username: Joi.string().optional(),
  sex: Joi.string()
    .pattern(/male|female/, 'male, female')
    .optional(),
  name: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
