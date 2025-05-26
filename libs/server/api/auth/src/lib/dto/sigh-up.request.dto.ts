import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IAuthSignUpRequestDtoBody } from '@octo-crm/shared';
import {
  EmailApiProperty,
  PasswordApiProperty,
  TransformStringLowerCase,
  TransformStringTrim,
} from '@octo-crm/server-core';

export class AuthSignUpRequestDtoBody implements IAuthSignUpRequestDtoBody {
  @EmailApiProperty('User')
  @IsString()
  @TransformStringTrim()
  @TransformStringLowerCase()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @PasswordApiProperty('User')
  @IsString()
  @TransformStringTrim()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password!: string;
}
