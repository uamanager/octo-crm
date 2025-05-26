import { TransformStringLowerCase, TransformStringTrim } from '@octo-crm/server-core';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IProjectCreateRequestDtoBody } from '@octo-crm/shared';

export class ProjectCreateRequestDtoBody implements IProjectCreateRequestDtoBody {
  @ApiProperty({
    type: String,
    description: 'Repository key',
    example: 'nestjs/nest',
  })
  @IsString()
  @TransformStringTrim()
  @TransformStringLowerCase()
  @IsNotEmpty()
  key!: string;
}
