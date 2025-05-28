import { IProjectSourceResponseDto } from '@octo-crm/shared';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectSourceOwnerResponseDto } from './project-owner.response.dto';
import { ProjectSourceRepositoryResponseDto } from './project-repository.response.dto';

export class ProjectSourceResponseDto implements IProjectSourceResponseDto {
  @ApiProperty({
    type: String,
    description: 'Repository key',
    example: 'nestjs/nest',
  })
  key!: string;

  @ApiPropertyOptional({
    type: () => ProjectSourceOwnerResponseDto,
    description: 'Owner',
  })
  owner!: ProjectSourceOwnerResponseDto | null;

  @ApiPropertyOptional({
    type: () => ProjectSourceRepositoryResponseDto,
    description: 'Repository',
  })
  repository!: ProjectSourceRepositoryResponseDto | null;
}
