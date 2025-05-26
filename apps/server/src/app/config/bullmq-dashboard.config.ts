import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface IBullMQConfig {
  route: string;
}

export default registerConfigAs<IBullMQConfig>(
  'bullmq-dashboard',
  {
    route: process.env['BULLMQ_DASHBOARD_ROUTE'],
  },
  Joi.object({
    route: Joi.string().default('/queues'),
  }),
  { abortEarly: true },
);
