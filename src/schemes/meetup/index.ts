import Joi from 'joi';

export const meetupSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  tags: Joi.array().items(Joi.string().required()).optional(),
  timestamp: Joi.string().isoDate().required(),
  participants: Joi.array().items(Joi.number().required()).required(),
});
