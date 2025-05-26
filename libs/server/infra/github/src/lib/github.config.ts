import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface IGithubConfig {
  apiKey: string;
}

export default registerConfigAs<IGithubConfig>(
  'github',
  {
    apiKey: process.env['GITHUB_API_KEY'],
  },
  Joi.object({
    apiKey: Joi.string().required(),
  }),
  { abortEarly: true },
);
