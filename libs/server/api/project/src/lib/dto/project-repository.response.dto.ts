import { IProjectSourceRepositoryResponseDto } from '@octo-crm/shared';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectSourceRepositoryResponseDto
  implements IProjectSourceRepositoryResponseDto
{
  @ApiProperty({
    type: String,
    description: 'Name',
    example: 'nest',
  })
  name!: string;

  @ApiProperty({
    type: String,
    description: 'Description',
    example: 'Nest is a progressive ... maintainable applications.',
  })
  description!: string;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Topics',
    example: ['nest', 'node', 'typescript', 'javascript'],
  })
  topics!: string[];

  @ApiProperty({
    type: String,
    description: 'License',
    example: 'MIT',
  })
  license!: string;

  @ApiProperty({
    type: Boolean,
    description: 'Private',
    example: true,
  })
  private!: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Template',
    example: true,
  })
  template!: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Archived',
    example: true,
  })
  archived!: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Fork',
    example: true,
  })
  fork!: boolean;

  @ApiProperty({
    type: String,
    description: 'URL',
    example: 'https://github.com/nestjs/nest',
  })
  url!: string;

  @ApiProperty({
    type: Number,
    description: 'Stars',
    example: 100,
  })
  stars!: number;

  @ApiProperty({
    type: Number,
    description: 'Forks',
    example: 100,
  })
  forks!: number;

  @ApiProperty({
    type: Number,
    description: 'Open issues',
    example: 100,
  })
  issues!: number;

  @ApiProperty({
    type: Number,
    description: 'Watchers',
    example: 100,
  })
  watchers!: number;

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

  @ApiProperty({
    type: Date,
    description: 'Last Push',
    example: '2021-01-01T00:00:00.000Z',
  })
  pushed_at!: Date;
}
