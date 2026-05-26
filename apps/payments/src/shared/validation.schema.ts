import Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  NOTIFICATIONS_HOST: Joi.string().required(),
  NOTIFICATIONS_PORT: Joi.number().required(),
});
