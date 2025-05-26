import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface ISwaggerConfig {
  enabled: boolean;
  prefix: string;
}

export default registerConfigAs<ISwaggerConfig>(
  'swagger',
  {
    enabled: process.env['SWAGGER_ENABLED'] === 'true',
    prefix: process.env['SWAGGER_ROOT_PREFIX'],
  },
  Joi.object({
    enabled: Joi.boolean().default(false),
    prefix: Joi.string().valid('docs').default('docs'),
  }),
  { abortEarly: true },
);
