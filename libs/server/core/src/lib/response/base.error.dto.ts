import { IBaseErrorDto } from '@octo-crm/core';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto implements IBaseErrorDto {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: 500,
  })
  status: number;

  @ApiProperty({
    type: String,
    description: 'Name',
    example: 'InternalServerErrorException',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Message',
    example: 'Internal Server Error',
  })
  message: string;

  constructor(status: number, name: string, message: string) {
    this.status = status;
    this.name = name;
    this.message = message;
  }

  static from(err: unknown) {
    const _exception =
      err instanceof HttpException ? err : new InternalServerErrorException(err);

    return new ErrorDto(_exception.getStatus(), _exception.name, _exception.message);
  }
}
