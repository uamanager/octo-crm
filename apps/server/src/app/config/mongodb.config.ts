import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface IMongoDbConfig {
  uri: string;
}

export default registerConfigAs<IMongoDbConfig>(
  'mongodb',
  {
    uri: process.env['MONGO_URI'],
  },
  Joi.object({
    uri: Joi.string().required(),
  }),
  { abortEarly: true },
);
