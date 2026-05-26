import Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.number().required(),
  MONGO_DATABASE: Joi.string().required(),
  PORT: Joi.number().default(3000),
  AUTH_HOST: Joi.string().required(),
  AUTH_PORT: Joi.number().required(),
  PAYMENTS_HOST: Joi.string().required(),
  PAYMENTS_PORT: Joi.number().required(),
});
