import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IAuthSignInRequestDtoBody } from '@octo-crm/shared';
import {
  EmailApiProperty,
  PasswordApiProperty,
  TransformStringLowerCase,
  TransformStringTrim,
} from '@octo-crm/server-core';

export class AuthSignInRequestDtoBody implements IAuthSignInRequestDtoBody {
  @EmailApiProperty('User')
  @IsString()
  @TransformStringTrim()
  @TransformStringLowerCase()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @PasswordApiProperty('User')
  @IsString()
  @TransformStringTrim()
  @IsNotEmpty()
  password!: string;
}
