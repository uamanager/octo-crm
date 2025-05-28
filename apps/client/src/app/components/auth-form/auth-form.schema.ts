import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const JoiPassword = Joi.extend(joiPasswordExtendCore);

export interface IAppAuthForm {
  email: string;
  password: string;
}

export const authSchema = Joi.object<IAppAuthForm>({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': '{#label} is required',
      'string.email': '{#label} has invalid format',
    })
    .label('Email'),
  password: JoiPassword.string()
    .required()
    .trim()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .messages({
      'string.empty': "{#label} can't be blank",
      'string.min': '{#label} should contain at least {#limit} characters',
      'password.minOfUppercase':
        '{#label} should contain at least {#min} uppercase character',
      'password.minOfSpecialCharacters':
        '{#label} should contain at least {#min} special character',
      'password.minOfLowercase':
        '{#label} should contain at least {#min} lowercase character',
      'password.minOfNumeric':
        '{#label} should contain at least {#min} numeric character',
      'password.noWhiteSpaces': '{#label} should not contain white spaces',
      'password.onlyLatinCharacters': '{#label} should only contain latin characters',
    })
    .label('Password'),
});
