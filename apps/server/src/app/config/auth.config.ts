import Joi from 'joi';
import { registerConfigAs } from '@octo-crm/server-core';
import pkg from '../../../package.json';
import { Algorithm } from 'jsonwebtoken';

export interface IGithubConfig {
  privateKey: string;
  publicKey: string;
  audience: string;
  issuer: string;
  ttl: string;
  algorithm: Algorithm;
}

export default registerConfigAs<IGithubConfig>(
  'auth',
  {
    privateKey: process.env['JWT_PRIVATE_KEY'],
    publicKey: process.env['JWT_PUBLIC_KEY'],
    audience: process.env['JWT_AUDIENCE'],
    issuer: process.env['JWT_ISSUER'],
    ttl: process.env['JWT_TTL'],
    algorithm: process.env['JWT_ALGORITHM'] as Algorithm,
  },
  Joi.object({
    privateKey: Joi.string().required(),
    publicKey: Joi.string().required(),
    audience: Joi.string().default(pkg.appName),
    issuer: Joi.string().default(pkg.appName),
    ttl: Joi.string().default('1d'),
    algorithm: Joi.string()
      .valid(
        'HS256',
        'HS384',
        'HS512',
        'RS256',
        'RS384',
        'RS512',
        'ES256',
        'ES384',
        'ES512',
        'PS256',
        'PS384',
        'PS512',
        'none',
      )
      .default('RS256'),
  }),
  { abortEarly: true },
);
