import Joi from 'joi';
import { REPOSITORY_KEY_REGEX } from '@octo-crm/core';

export interface IAppProjectForm {
  key: string;
}

export const addProjectSchema = Joi.object<IAppProjectForm>({
  key: Joi.string()
    .trim()
    .pattern(REPOSITORY_KEY_REGEX)
    .required()
    .messages({
      'string.empty': '{#label} is required',
      'string.pattern.base':
        'May only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen',
    })
    .label('Project key'),
});
