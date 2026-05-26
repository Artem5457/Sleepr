import Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_USER: Joi.string().required(),
  MONGO_PASSWORD: Joi.string().required(),
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.number().required(),
  MONGO_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRATION: Joi.number().required(),
  HTTP_PORT: Joi.number().required(),
  TCP_PORT: Joi.number().required(),
});
