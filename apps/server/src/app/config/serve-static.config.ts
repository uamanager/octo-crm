import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';

export interface IServeStaticConfig {
  rootPath: string;
  serveRoot: string;
  renderPath: string;
}

export default registerConfigAs<IServeStaticConfig>(
  'serve-static',
  {
    rootPath: process.env['STATIC_ROOT_PATH'],
    serveRoot: process.env['STATIC_ROOT_PREFIX'],
    renderPath: process.env['STATIC_RENDER_PATH'],
  },
  Joi.object({
    rootPath: Joi.string().default('./public'),
    serveRoot: Joi.string().default(''),
    renderPath: Joi.string().default('/{*splat}'),
  }),
  { abortEarly: true },
);
