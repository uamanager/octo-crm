import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface IBullMQConfig {
  host: string;
  port: number;
}

export default registerConfigAs<IBullMQConfig>(
  'bullmq',
  {
    host: process.env['REDIS_HOST'],
    port: +(process.env['REDIS_PORT'] ?? '6379'),
  },
  Joi.object({
    host: Joi.string().required(),
    port: Joi.number().default(6379),
  }),
  { abortEarly: true },
);
