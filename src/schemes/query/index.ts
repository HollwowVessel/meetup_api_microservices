import Joi from 'joi';

export const queryObjectSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  timestamp: Joi.string().isoDate(),
  tags: [Joi.array().items(Joi.string().required()), Joi.string()],
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
  page: Joi.number().optional(),
  offset: Joi.number().optional(),
  sort: Joi.string()
    .pattern(/id|name|timestamps/, 'id, name, timestamps')
    .optional(),
});
