import Joi from 'joi';

export const validationSchema = Joi.object({
  MONGODB_URI: Joi.string().required(),
  PORT: Joi.number().default(3000),
  AUTH_HOST: Joi.string().required(),
  AUTH_PORT: Joi.number().required(),
  PAYMENTS_HOST: Joi.string().required(),
  PAYMENTS_PORT: Joi.number().required(),
});
