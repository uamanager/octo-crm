import {
  IProjectSearchResponseDto,
  IProjectSearchResponseResultDto,
} from '@octo-crm/shared';
import { ProjectResponseDto } from './project.response.dto';
import { ResponseListDto } from '@octo-crm/server-core';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectSearchResponseResultDto
  extends ProjectResponseDto
  implements IProjectSearchResponseResultDto {}

export class ProjectSearchResponseDto
  extends ResponseListDto<ProjectSearchResponseResultDto[]>
  implements IProjectSearchResponseDto
{
  @ApiProperty({
    type: () => ProjectSearchResponseResultDto,
    description: 'Result',
    isArray: true,
  })
  override result!: ProjectSearchResponseResultDto[];
}
