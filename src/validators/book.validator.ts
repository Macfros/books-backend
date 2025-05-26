import Joi from 'joi';

export const bookSchema = Joi.object({
  title: Joi.string().min(2).required(),
  author: Joi.string().min(2).required(),
  genre: Joi.string().required(),
  description: Joi.string().optional()
});