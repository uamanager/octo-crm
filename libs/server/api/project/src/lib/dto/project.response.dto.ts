import { IProjectResponseDto } from '@octo-crm/shared';
import { IdApiProperty } from '@octo-crm/server-core';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectSourceResponseDto } from './project-source.response.dto';

export class ProjectResponseDto implements IProjectResponseDto {
  @IdApiProperty('Project', 'projects')
  id!: string;

  @ApiProperty({
    type: String,
    description: 'Repository key',
    example: 'nestjs/nest',
  })
  key!: string;

  @IdApiProperty('User', 'users')
  user!: string;

  @ApiPropertyOptional({
    type: () => ProjectSourceResponseDto,
    description: 'Owner',
  })
  source!: ProjectSourceResponseDto | null;

  @ApiProperty({
    type: Date,
    description: 'Creation date',
    example: '2021-01-01T00:00:00.000Z',
  })
  created_at!: Date;

  @ApiProperty({
    type: Date,
    description: 'Last update',
    example: '2021-01-01T00:00:00.000Z',
  })
  updated_at!: Date;
}
