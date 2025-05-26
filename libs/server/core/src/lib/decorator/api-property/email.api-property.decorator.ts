import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export const EmailApiProperty = (name: string, isRequired = true): PropertyDecorator => {
  return applyDecorators(
    (isRequired ? ApiProperty : ApiPropertyOptional)({
      description: `${name} Email`,
      example: 'john.doe@example.com',
      type: String,
      format: 'email',
      maxLength: 255,
    }),
  );
};

export const EmailApiPropertyOptional = (name: string): PropertyDecorator => {
  return applyDecorators(EmailApiProperty(name, false));
};
