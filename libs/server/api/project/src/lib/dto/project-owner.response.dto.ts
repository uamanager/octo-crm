import { RepositoryOwnerType } from '@octo-crm/core';
import { IProjectSourceOwnerResponseDto } from '@octo-crm/shared';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectSourceOwnerResponseDto implements IProjectSourceOwnerResponseDto {
  @ApiProperty({
    type: String,
    description: 'Login',
    example: 'nestjs',
  })
  login!: string;

  @ApiProperty({
    type: String,
    description: 'Avatar URL',
    example: 'https://avatars.githubusercontent.com/u/123456789',
  })
  avatar_url!: string;

  @ApiProperty({
    type: String,
    description: 'URL',
    example: 'https://github.com/nestjs',
  })
  url!: string;

  @ApiProperty({
    type: String,
    enum: RepositoryOwnerType,
    description: 'Type',
    example: RepositoryOwnerType.ORGANIZATION,
  })
  type!: RepositoryOwnerType;
}
