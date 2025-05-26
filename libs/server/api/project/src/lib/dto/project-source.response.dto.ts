import { IProjectSourceResponseDto } from '@octo-crm/shared';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectSourceOwnerResponseDto } from './project-owner.response.dto';
import { ProjectSourceRepositoryResponseDto } from './project-repository.response.dto';

export class ProjectSourceResponseDto implements IProjectSourceResponseDto {
  @ApiProperty({
    type: String,
    description: 'Repository key',
    example: 'nestjs/nest',
  })
  key!: string;

  @ApiProperty({
    type: () => ProjectSourceOwnerResponseDto,
    description: 'Owner',
  })
  owner!: ProjectSourceOwnerResponseDto;

  @ApiProperty({
    type: () => ProjectSourceRepositoryResponseDto,
    description: 'Repository',
  })
  repository!: ProjectSourceRepositoryResponseDto;
}
