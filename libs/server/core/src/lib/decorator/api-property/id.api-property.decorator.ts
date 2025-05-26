import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export interface IdApiPropertyOptions {
  isRequired?: boolean;
  isArray?:
    | boolean
    | {
        minItems?: number;
        maxItems?: number;
      };
}

export const IdApiProperty = (
  name: string,
  reference: string,
  isArray:
    | boolean
    | {
        minItems?: number;
        maxItems?: number;
      } = false,
  isRequired = true,
) => {
  const _isArray = !!isArray;
  const _isArrayMinItems = typeof isArray === 'object' ? isArray.minItems : undefined;
  const _isArrayMaxItems = typeof isArray === 'object' ? isArray.maxItems : undefined;

  return applyDecorators(
    (isRequired ? ApiProperty : ApiPropertyOptional)({
      description: `${name} Identifier${_isArray ? 's' : ''} (&${reference})`,
      example: isArray ? ['6492cd1c2451e3060b503689'] : '6492cd1c2451e3060b503689',
      type: String,
      format: 'hexadecimal',
      pattern: '^[0-9a-fA-F]+$',
      minLength: 24,
      maxLength: 24,
      isArray: _isArray,
      minItems: _isArrayMinItems,
      maxItems: _isArrayMaxItems,
    }),
  );
};

export const IdApiPropertyOptional = (
  name: string,
  reference: string,
  isArray:
    | boolean
    | {
        minItems?: number;
        maxItems?: number;
      } = false,
) => {
  return applyDecorators(IdApiProperty(name, reference, isArray, false));
};
