import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const PasswordApiProperty = (name: string): PropertyDecorator => {
  return applyDecorators(
    ApiProperty({
      description: `${name} Password`,
      example: 'Secure-Password_123',
      type: String,
      format: 'password',
      minLength: 8,
    }),
  );
};
